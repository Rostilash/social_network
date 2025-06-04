import "./App.css";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
import { Profile } from "./components/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import { MyPostsContainer } from "./components/MyPosts/MyPostsContainer";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Profile store={props.store} />} />
          <Route path="/dialogs" element={<DialogsContainer store={props.store} />} />
          <Route path="/profile" element={<MyPostsContainer store={props.store} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
