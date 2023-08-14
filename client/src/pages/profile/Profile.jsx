import "./profile.css";
import Topbar from "./../../components/topbar/Topbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import Feed from "./../../components/feed/Feed";
import Rightbar from "./../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Update from "../../components/update/Update";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [profile, setProfile] = useState(false);
  const [cover, setCover] = useState(false);
  const { user:currentUser } = useContext(AuthContext);

  useEffect(() => {
    const FetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?username=${username}`
      );
      setUser(res.data);
    };
    FetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile_Container">
        <div className="profileLeft">
          <Sidebar />
        </div>
        <div className="profileRight">
          <div className="profileRight_Top">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
                className="coverImg"
              />
               {(!username || username===currentUser.username) &&
              <AddAPhotoIcon className="coverIcon" onClick={()=>setCover(true)}/>}

              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="userImg"
              />
             {(!username || username===currentUser.username) &&
              <AddAPhotoIcon className="photoIcon" onClick={()=>setProfile(true)} />
             }
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRight_Bottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
        {profile && <Update profile={setProfile} profileUser={currentUser} coverPic={false}/>}
        {cover && <Update profile={setCover} profileUser={currentUser} coverPic={true}/>}
      </div>
    </>
  );
}

export default Profile;
