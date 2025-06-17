import "./App.css";
import React, { Suspense, lazy, Navigate } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import { MyPostsContainer } from "./components/MyPosts/MyPostsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "./HOC/withRouter";
import { initializeApp } from "./redux/app-reducer";
import { PreLoader } from "./components/common/Preloader/PreLoader";
import { withSuspense } from "./HOC/withSuspense";

const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./components/Users/UsersContainer")), 2000);
    })
);

class App extends React.Component {
  catchAllUnhendleErrors = (promiseRejectionEvent) => {
    alert("hello");
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhendleErrors);
  }
  componentWillUnmount() {
    window.addEventListener("unhandledrejection", this.catchAllUnhendleErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <PreLoader />;
    }

    const SuspendedDialogs = withSuspense(DialogsContainer);
    const SuspendedUsers = withSuspense(UsersContainer);

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBar />
        <div>
          <Routes>
            <Route expect path="/" element={<MyPostsContainer />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/dialogs" element={<SuspendedDialogs />} />
            <Route path="/users" element={<SuspendedUsers />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
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
