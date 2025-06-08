import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import { MyPostsContainer } from "./components/MyPosts/MyPostsContainer";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeadeContainer from "./components/Header/HeaderContainer";
import Login from "./components/Header/Login";

function App(props) {
  return (
    <div className="app-wrapper">
      <HeadeContainer />
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<MyPostsContainer store={props.store} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<ProfileContainer store={props.store} />} />
          <Route path="/dialogs" element={<DialogsContainer store={props.store} />} />
          <Route path="/users" element={<UsersContainer store={props.store} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
