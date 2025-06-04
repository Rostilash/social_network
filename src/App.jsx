import "./App.css";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
import { Dialogs } from "./components/Dialogs/Dialogs";
import { Profile } from "./components/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import { MyPosts } from "./components/MyPosts/MyPosts";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dialogs" element={<Dialogs store={props.store} />} />
          <Route path="/profile" element={<MyPosts state={props.state.profilePage} dispatch={props.dispatch} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
