import "./App.css";
import React from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import { MyPostsContainer } from "./components/MyPosts/MyPostsContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "./HOC/withRouter";
import { initializeApp } from "./redux/app-reducer";
import { PreLoader } from "./components/common/Preloader/PreLoader";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <PreLoader />; // або будь-який preloader/spinner
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<MyPostsContainer />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
});

export default compose(connect(mapStateToProps, { initializeApp }), withRouter)(App);
