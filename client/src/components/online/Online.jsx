import "./online.css";

function Online({profilePicture,username}) {
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarImageContainer">
        <img
          src={PF+profilePicture}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="circle"></span>
      </div>
      <span className="rightbarUserName">{username}</span>
    </li>
  );
}

export default Online;
