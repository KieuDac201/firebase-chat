import React from "react";

const Message = ({
  displayName,
  photoURL,
  text,
  createAt,
  currentUid,
  uid,
}) => {
  return (
    <li className={currentUid === uid ? "message current" : "message"}>
      <img src={photoURL} alt={displayName} />
      <p>{text}</p>
    </li>
  );
};

export default Message;
