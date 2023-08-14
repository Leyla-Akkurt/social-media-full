const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());

const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer=require("multer"); //for file uploading
const dotenv = require("dotenv");
const UserRoute = require("./routes/user");
const AuthRoute = require("./routes/auth");
const PostRoute = require("./routes/post");
const ConversationRoute = require("./routes/conversations");
const MessageRoute = require("./routes/messages");
const CommentRoute = require("./routes/comment");

const router = express.Router();
const path=require("path");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
//when you go to images directly go to images directory not a path
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet()); // for request server securely
app.use(morgan("common")); // login middleware


const storage=multer.diskStorage({
destination:(req,file,cb)=>{
  cb(null,"public/images");
},
filename:(req,file,cb)=>{
  cb(null,file.originalname);//

}
});

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
    return res.status(200).json("File uploaded succesfully")
  }catch(err){
    console.log(err)
  }
});

app.use("/api/users", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/posts", PostRoute);
app.use("/api/conversations", ConversationRoute);
app.use("/api/messages", MessageRoute);
app.use("/api/comment",CommentRoute);

app.listen(8800, console.log("Backend server is running"));
