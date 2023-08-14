const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
desc:{
    type:String,
    require:true
},
postId:{
    type:String,
},
userId:{
    type:String,
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
