import s from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";

export const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogElements = state.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message} />);
  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.sendMessage();
  };
  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
  };

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
