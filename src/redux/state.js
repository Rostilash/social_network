const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "hi how are you?", likesCount: 12 },
        { id: 2, message: "WIll you help me?", likesCount: 1 },
        { id: 3, message: "something i can wtite", likesCount: 4 },
        { id: 4, message: "Realy?", likesCount: 5 },
      ],
      newPostsText: "My-some-text.com",
    },
    dialogsPage: {
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
    },
    sidebar: {},
  },

  _callSubscriber() {
    console.log("state Changed");
  },

  getState() {
    // debugger;
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    //{ type: 'ADD-POST'}
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostsText,
        likesCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostsText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostsText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let body = this._state.dialogsPage.newMessageBody;
      this._state.dialogsPage.newMessageBody = "";
      this._state.dialogsPage.messages.push({ id: 6, message: body });
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default store;
window.store = store;
