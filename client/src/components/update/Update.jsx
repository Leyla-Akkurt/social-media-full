import { useState } from "react";
import "./update.css";
import Cancel from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

function Update({ profile, profileUser, coverPic}) {
  const [update, setUpdate] = useState(null);
  const [user, setUser] = useState({});

  const upload = async (file) => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("name", file.name);
      coverPic? profileUser.coverPicture = file.name : profileUser.profilePicture = file.name;
      try {
        const res = await axios.post("http://localhost:8800/api/upload", data);
        console.log(res.data)
        return res.data;

      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //upload a file
    let profileUrl;
    profileUrl = update ? await upload(update) : profileUser.profilePicture;
    await upload(update);
  let newUser={};
    if(coverPic){
      newUser = {
        userId: profileUser._id,
        coverPicture: profileUser.coverPicture,
      }
}
      else  {
        newUser = {
          userId: profileUser._id,
          profilePicture: profileUser.profilePicture,
        };

      }
    //update a user
    try {
      await axios.put(
        `http://localhost:8800/api/users/${profileUser._id}`,
        newUser
      );

    } catch (err) {
      console.log(err);
    }
    setUser(profileUser)
  };
  console.log(user)
  return (
    <div className="update">
      {update && (
        <div className="updateImgContainer">
          <img src={URL.createObjectURL(update)} className="updateImg" alt="" />
        </div>
      )}
      <Cancel className="updateCancelButton" onClick={() => profile(null)} />
      <form className="updateForm" onSubmit={handleSubmit}>
        <label htmlFor="photo" className="uploadPhoto">
          <CloudUploadIcon />
          <span className="uploadText">Upload a Photo</span>
          <input
            type="file"
            id="photo"
            onChange={(e) => setUpdate(e.target.files[0])}
            placeholder="Upload a photo"
            style={{ display: "none" }}
          />
        </label>
        <button className="sendButton">Send</button>
      </form>
    </div>
  );
}

export default Update;
