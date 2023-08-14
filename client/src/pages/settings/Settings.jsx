import { useContext, useRef, useState } from "react";
import "./settings.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

function Settings() {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user,setUser]=useState({});


  const handleUpdate =async (e) => {
    e.preventDefault();
    const newUser = {
      ...currentUser,
      userId: currentUser._id,
      username: username || currentUser.username,
      password: password || currentUser.password,
      email: email || currentUser.email,
    };

    //update a user
    try {
       await axios.put(
        `http://localhost:8800/api/users/${currentUser._id}`,
        newUser
      );


    } catch (err) {
      console.log(err);
    }
    setUser(currentUser)
  };
console.log(user)
  const handleTurn = () => {
    navigate("/");
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <form className="settingsForm" onSubmit={handleUpdate}>
          <input
            type="text"
            className="inputSettings"
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input
            className="inputSettings"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            type="password"

          />
          <input
            type="email"
            className="inputSettings"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}

          />
          <button className="settingsButton">Update</button>
          <button className="settingsButton turn" onClick={handleTurn}>
            Turn Home Page
          </button>
        </form>

      </div>
    </div>
  );
}

export default Settings;
