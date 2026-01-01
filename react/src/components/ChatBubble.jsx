import React from "react";
import PropTypes from "prop-types";

const ChatBubble = ({ user, time, message, status, userProfile }) => {
  const isSent = status === "sent";

  return (
    <div className={`chat ${isSent ? "chat-start" : "chat-end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User Avatar" src={userProfile} />
        </div>
      </div>
      <div className="chat-header">{user}</div>
      <div className="chat-bubble chat-bubble-warning">{message}</div>
      <div className="chat-footer opacity-50">
        {isSent ? "Delivered" : "Seen at " + time}
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  user: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["sent", "seen"]).isRequired,
  userProfile: PropTypes.string.isRequired,
};

export default ChatBubble;
