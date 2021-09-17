import { useEffect, useState } from "react";
import { db } from "../../config";
import { MdTagFaces } from "react-icons/md";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import Message from "../Message";
import Picker from "emoji-picker-react";

const Channel = ({ user = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isShowPicker, setIsShowPicker] = useState(false);
  const messageRef = collection(db, "messages");
  const { uid, displayName, photoURL } = user;
  console.log(user);

  useEffect(() => {
    const q = query(messageRef, orderBy("createAt"), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(data);
      setMessages(data);
    });

    return unsubscribe;
  }, []);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      await setDoc(doc(messageRef), {
        text: trimmedMessage,
        createAt: Timestamp.now(),
        uid,
        displayName,
        photoURL,
      });

      setNewMessage("");
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    setNewMessage(newMessage + emoji);
  };

  return (
    <>
      <ul className="channel">
        {messages.map((message) => (
          <Message
            key={message.id}
            currentUid={uid}
            text={message.text}
            photoURL={message.photoURL}
            uid={message.uid}
            displayName={message.displayName}
          />
        ))}
      </ul>
      <form onSubmit={handleOnSubmit} className="form">
        <div className="formInput">
          <input
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Nhập message vào đây..."
          />
          {isShowPicker && (
            <Picker onEmojiClick={onEmojiClick} className="emojiPicker" />
          )}
          <span className="emojiIcon">
            <MdTagFaces onClick={() => setIsShowPicker(!isShowPicker)} />
          </span>
        </div>
        <button
          type="submit"
          disabled={!newMessage}
          onClick={() => setIsShowPicker(false)}
        >
          Gửi
        </button>
      </form>
    </>
  );
};

export default Channel;
