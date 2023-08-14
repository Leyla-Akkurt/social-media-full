const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("post was deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//like & dislike post
router.put("/:id/like", async (req, res) => {
  try{
const post=await Post.findById(req.params.id);
if(!post.likes.includes(req.body.userId)){
  await post.updateOne({$push:{likes:req.body.userId}});
  res.status(200).json("the post has been liked");
}else{
  await post.updateOne({$pull:{likes:req.body.userId}});
  res.status(200).json("the post has been disliked");
}
  }catch(err){
res.status(500).json(err);
  }
});

// add or remove hearth
router.put("/:id/hearth", async (req, res) => {
  try{
const post=await Post.findById(req.params.id);
if(!post.hearths.includes(req.body.userId)){
  await post.updateOne({$push:{hearths:req.body.userId}});
  res.status(200).json("hearth was added the post");
}else{
  await post.updateOne({$pull:{hearths:req.body.userId}});
  res.status(200).json("hearth was removed from the post");
}
  }catch(err){
res.status(500).json(err);
  }
});


//get a post
router.get("/:id", async (req,res)=>{
  try{
   const post=await Post.findById(req.params.id);
   res.status(200).json(post);
  }catch(err){
    res.status(500).json(err);
  }
})

//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user=await User.findOne({username:req.params.username})
    const posts=await Post.find({userId:user._id});
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
