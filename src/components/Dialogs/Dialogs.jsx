import s from "./Dialogs.module.css";
import React, { useEffect } from "react";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { useNavigate } from "react-router-dom";

export const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogElements = state.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message} />);
  let newMessageBody = props.newMessageBody;

  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
  };

  let onSendMessageClick = () => {
    props.sendMessage();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isAuth) {
      navigate("/login");
    }
  }, [props.isAuth, navigate]);

  if (!props.isAuth) return null;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.message}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea value={newMessageBody} onChange={onNewMessageChange} placeholder="Введіть своє повідомлення"></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Надіслати</button>
          </div>
        </div>
      </div>
    </div>
  );
};
