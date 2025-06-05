import { createStore, combineReducers } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import { usersReducer } from "./users-reducer";

//take old state, and action and response new copy from function
// we put it like key=> reduce file.
let counterReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sideBar: sidebarReducer,
  usersPage: usersReducer,
});

let store = createStore(counterReducer);

window.store = store;

export default store;
