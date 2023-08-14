import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import {Users} from '../../data';
import CloseFriend from "../closeFriend/CloseFriend";

function Sidebar() {
  return (
    <div className="sidebar_container">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>

          <li className="sidebarListItem">
            <ChatIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>

          <li className="sidebarListItem">
            <SlowMotionVideoIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>

          <li className="sidebarListItem">
            <GroupIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>

          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">BookMarks</span>
          </li>

          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>

          <li className="sidebarListItem">
            <WorkIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>

          <li className="sidebarListItem">
            <EventIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>

          <li className="sidebarListItem">
            <SchoolIcon className="sidebarListIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <ul className="sidebar_friendList">
              {Users.map(user=>(
                <CloseFriend key={user.id} user={user}/>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
