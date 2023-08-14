import './message.css';
import { format } from 'timeago.js';

function Message({message,own}) {
    const PF = import.meta.env.VITE_REACT_PUBLIC_FOLDER;
  return (

    <div className={own ? "message own":"message"}>
        <div className="messageTop">
            <img src={PF+"/person/1.jpeg"} alt="" className="messageImg" />
            <p className="messageText"> {message.text}</p>
        </div>
        <div className="messageBottom">
            <p>{format(message.createdAt)}</p>
        </div>
    </div>
  )
}

export default Message
