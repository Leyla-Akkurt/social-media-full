const router = require("express").Router();
const User = require("../models/User");
const bcrytp = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrytp.genSalt(10);
    const hashedPassword = await bcrytp.hash(req.body.password, salt);

    //generate new User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login",async(req,res)=>{
    try{
    //user
    const user=await User.findOne({email:req.body.email});
    !user && res.status(404).json("user not found");

    //password
    const validPasssword= await bcrytp.compare(req.body.password,user.password);
    !validPasssword && res.status(400).json("password is incorrect");

    //correct  password & user
    res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }




})



module.exports = router;
