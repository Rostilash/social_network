import s from "./Dialogs.module.css";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";

export const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsPage;
  let onImprove = props.store;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };
  let onNewMessageChange = (body) => {
    onImprove.dispatch(updateNewMessageBodyCreator(body));
  };

  return <Dialogs sendMessage={onSendMessageClick} updateNewMessageBody={onNewMessageChange} dialogsPage={state} />;
};
