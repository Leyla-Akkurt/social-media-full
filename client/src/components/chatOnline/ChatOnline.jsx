import axios from "axios";
import "./chatOnline.css";
import { useEffect, useState } from "react";

function ChatOnline({ onlineUsers, currentUserId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users/friends/" + currentUserId
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends,onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentUserId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((online) => (
        <div className="chatOnlineFriends" onClick={()=>handleClick(online)}>
          <div className="chatOnlineImgContainer">
            <img
              src={
                online?.profilePicture
                  ? PF + online.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
