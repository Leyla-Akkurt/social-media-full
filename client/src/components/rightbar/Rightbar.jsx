import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";
import UserFriends from "./../userFriends/UserFriends";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

function Rightbar({ user }) {
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  const { user: currentUser ,dispatch} = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(currentUser.following.includes(user?.id));


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:8800/api/users/friends/" + user._id
        );

        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if(followed){
      await axios.put("http://localhost:8800/api/users/"+user._id+"/unfollow",{
       userId: currentUser._id
      })
      dispatch({type:"UNFOLLOW",payload:user._id});
      }else{
        await axios.put("http://localhost:8800/api/users/"+user._id+"/follow",{
          userId: currentUser._id
        })
        dispatch({type:"FOLLOW",payload:user._id});
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pole Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src={PF + "ad.png"} alt="" className="rightbarAd" />
        <ul className="rightbarFriends">
          <span className="rightbarFriendsText">Online Friends</span>
          {Users.map((user) => (
            <Online key={user.id} {...user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="followButton" onClick={handleClick}>
           {followed ? "Unfollow": "Follow"}
           {followed ? <Remove />: <Add />}

          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="InfoKey">City: </span>
            <span className="InfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="InfoKey">From: </span>
            <span className="InfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="InfoKey">Relationship: </span>
            <span className="InfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return <UserFriends friend={friend} />;
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar_container">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
