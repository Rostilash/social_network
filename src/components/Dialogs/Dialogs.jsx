import React from "react";
import s from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { AddMessageForm } from "./Message/AddMessageForm";

export const Dialogs = (props) => {
  const state = props.dialogsPage;
  const dialogElements = state.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);
  const messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message} />);

  const onSendMessage = (data) => {
    props.updateNewMessageBody(data.newMessage);
    props.sendMessage();
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.message}>
        <div>{messagesElements}</div>
        <AddMessageForm onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};
