import "./userFriends.css";
import { Link } from "react-router-dom";

function UserFriends({ friend }) {
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  return (
    <div className="rightbarFollowing">
      <Link to={"/profile/" + friend.username}>
        <img
          src={
            friend.profilePicture
              ? PF + friend.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="rightbarFollowingImg"
        />
      </Link>
      <span className="rightbarFollowingName">{friend.username}</span>
    </div>
  );
}

export default UserFriends;
