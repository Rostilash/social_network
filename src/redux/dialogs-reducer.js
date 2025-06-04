const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
  dialogs: [
    { id: 1, name: "Dymux" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Jhon" },
    { id: 4, name: "Marioa" },
    { id: 5, name: "Walle" },
    { id: 6, name: "Barcowich" },
  ],
  messages: [
    { id: 1, message: "h1!" },
    { id: 2, message: "How are you doing" },
    { id: 3, message: "h1!" },
    { id: 4, message: "h1!" },
    { id: 5, message: "h1!" },
  ],
  newMessageBody: "",
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state;
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = "";
      state.messages.push({ id: 6, message: body });
      return state;
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;
