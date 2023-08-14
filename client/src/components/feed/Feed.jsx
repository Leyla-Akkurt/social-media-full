import { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const FetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
        : await axios.get(
            "http://localhost:8800/api/posts/timeline/" + user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    FetchPosts();
  }, [username]);

  return (
    <div className="feed_container">
      <div className="feedWrapper">
        {(!username || username===user.username) && <Share/>}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
