import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Cancel from "@mui/icons-material/Cancel";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";

function Share() {
  const { user: currentUser } = useContext(AuthContext);
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const FetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?username=${currentUser.username}`
      );
      setUser(res.data);
    };
    FetchUser();
  }, [currentUser]);

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("name", file.name);
      newPost.img = file.name;
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("http://localhost:8800/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share_Container">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} className="shareImg" alt="" />
            <Cancel className="CancelButton" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon className=" shareIcon mediaIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>

            <div className="shareOption">
              <LabelIcon className="shareIcon labelIcon" />
              <span className="shareOptionText">Tags</span>
            </div>

            <div className="shareOption">
              <LocationOnIcon className="shareIcon locationIcon" />
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption">
              <EmojiEmotionsIcon className="shareIcon emotionIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>

          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
