const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json("password can not updated");
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("You deleted user succesfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can not delete this account");
  }
});
//get
//using query here like lh:8800/users?userId=1452155 or
//lh:8800/users?username="john"
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get online user's friend
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await Promise.all(user.following.map(
      friendId=>{
        return User.findById(friendId);
      }
    ));
    let friendList=[];
   friend.map(friend=>{
    const {_id,username,profilePicture}=friend;
    friendList.push({_id,username,profilePicture});
   })
   res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("You have already follow the user");
      }
    } catch (err) {
      res.status(403).json(err);
    }
  } else {
    res.status(500).json("you can not follow yourself");
  }
});

//unfollow

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You dont follow the user");
      }
    } catch (err) {
      res.status(403).json(err);
    }
  } else {
    res.status(500).json("you can not unfollow yourself");
  }
});

module.exports = router;
