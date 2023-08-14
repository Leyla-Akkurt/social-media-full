import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { LogoutCall } from "../../ApiCalls";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate } from "react-router";
import axios from "axios";

function Topbar() {
  const { user:currentUser, dispatch } = useContext(AuthContext);
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleLogOut = () => {
    LogoutCall(dispatch);
  };


  useEffect(() => {
    const FetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?username=${currentUser.username}`
      );
      setUser(res.data);
    };
    FetchUser();
  }, [currentUser]);
console.log(user)
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ZED Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="topbarItem">
          <SearchIcon className="searchIcon" />
          <input
            className="topbarInput"
            type="search"
            placeholder="Search for friend, post or video"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/">
            <span className="topbarLink">
              <HomeIcon />
            </span>
          </Link>
          <span className="topbarLink">
            <LogoutIcon onClick={() => handleLogOut()} />
          </span>
          <Link to="/messengar">
            <span className="topbarLink">
              <QuestionAnswerIcon />
            </span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIcon">
            <ChatIcon className="topbarIconItem" />
            <span className="topbarIconBadge">3</span>
          </div>

          <div className="topbarIcon">
            <NotificationsIcon className="topbarIconItem" />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIcon">
            <SettingsIcon className="topbarIconItem"
            onClick={()=>navigate("/settings")}/>
          </div>
        </div>
        <div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
