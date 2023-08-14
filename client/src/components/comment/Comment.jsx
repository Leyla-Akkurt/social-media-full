import { useContext, useRef, useState } from "react";
import "./comment.css";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";

function Comment({ post }) {
  const { user: currentUser } = useContext(AuthContext);
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const commentRef = useRef();

  const writeComment = async (e) => {
    e.preventDefault();
    const newComment = {
      userId: user._id,
      postId: post._id,
      desc: commentRef.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/comment/",
        newComment
      );
      window.location.reload();
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/comment/" + post._id
      );
      setComments(
        res.data.sort((c1, c2) => {
          return new Date(c2.createdAt) - new Date(c1.createdAt);
        })
      );
    };
    fetchComments();
  }, [post]);

  useEffect(() => {
    const FetchUsers = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    FetchUsers();
  }, [post.userId]);
  console.log(user)

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePicture
              ? PF + currentUser.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="commentsImg"
        />
        <input
          type="text"
          placeholder="write a comment"
          className="commentsInput"
          ref={commentRef}
        />
        <button className="commentsButton" onClick={(e) => writeComment(e)}>
          Send
        </button>
      </div>
      {comments &&
        comments.map((comment) => (
          <div className="comment">
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="commentsImg"
            />
            <div className="info">
              <span className="commentName">{user.username}</span>
              <p className="commentDesc">{comment.desc}</p>
            </div>
            <span className="comemntDate">{format(comment.createdAt)}</span>
          </div>
        ))}
    </div>
  );
}

export default Comment;
