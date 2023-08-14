import './closeFriend.css';

function CloseFriend({user}) {
  const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  return (
    <li className="sidebar_friend">
    <img
      src={PF+user.profilePicture}
      alt=""
      className="sidebar_friendImg"
    />
    <span className="sidebar_FriendName">{user.username}</span>
  </li>
  )
}

export default CloseFriend
