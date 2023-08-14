import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../comment/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Post({ post }) {
  const [liked, setLiked] = useState(post.likes.length);
  const [isLiked, setIsliked] = useState(false);
  const [hearth, setHearth] = useState(post.hearths.length);
  const [isHearth, setIsHearth] = useState(false);
  const [user, setUser] = useState({});
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [deletePost, setDeletePost] = useState(false);
  const [likeIcon,setLikeIcon]=useState(false);
  const [hearthIcon,setHearthIcon]=useState(false);

  useEffect(() => {
    setIsliked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    setIsHearth(post.hearths.includes(currentUser._id));
  }, [currentUser._id, post.hearths]);

  useEffect(() => {
    const FetchUsers = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    FetchUsers();
  }, [post.userId]);

  const handleLike = () => {
    try {
      axios.put("http://localhost:8800/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLiked(isLiked ? liked - 1 : liked + 1 );
    setIsliked(!isLiked);
  };

  const handleDelete = () => {
    if (post.userId === currentUser._id) {
      try {
        axios.delete("http://localhost:8800/api/posts/" + post._id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else console.log("you can only delete your post");
  };

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/comment/" + post._id
      );
      setComments(res.data);
    };
    fetchComments();
  }, [post]);

  const handleHearth = () => {
    try {
      axios.put("http://localhost:8800/api/posts/" + post._id + "/hearth", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setHearth(isHearth ? hearth - 1 : hearth + 1);
    setIsHearth(!isHearth);
  };



  return (
    <div className="post_Container">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>

          <div className="postTopRight">
            <MoreVertIcon onClick={() => setDeletePost(!deletePost)} />
            {deletePost && <DeleteIcon onClick={handleDelete} />}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {!isLiked ? (
              <ThumbUpOffAltIcon
                className="likeIcon"
                onClick={() => handleLike()}
              />
            ) : (
              <ThumbUpIcon
                className="likeIcon"
                onClick={() => handleLike()}
                style={{ color: "#1877f2" }}
              />
            )}

            <span className="postLikeCounter">{liked}</span>
            {!isHearth ? (
              <FavoriteBorderIcon
                className="likeIcon"
                onClick={() => {handleHearth()}}
              />
            ) : (
              <FavoriteIcon
                className="likeIcon"
                onClick={() => handleHearth()}
                style={{ color: "red" }}
              />
            )}

            <span className="postLikeCounter">{hearth}</span>
          </div>
          <div className="postBottomRight">
            <TextsmsOutlinedIcon onClick={() => setCommentOpen(!commentOpen)} />
            <span className="postCommentText"> {comments.length} comments</span>
          </div>
        </div>
        {commentOpen && <Comment post={post} />}
      </div>
    </div>
  );
}

export default Post;
