import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "hi how are you?", likesCount: 12 },
        { id: 2, message: "WIll you help me?", likesCount: 1 },
        { id: 3, message: "something i can wtite", likesCount: 4 },
        { id: 4, message: "Realy?", likesCount: 5 },
      ],
      newPostsText: "",
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
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
