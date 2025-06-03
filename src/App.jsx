import "./App.css";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
import { Dialogs } from "./components/Dialogs/Dialogs";
import { Profile } from "./components/Profile/Profile";
import { Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dialogs" element={<Dialogs store={props.store} />} />
          <Route path="/profile" element={<Profile state={props.state.ProfilePage} dispatch={props.dispatch} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
