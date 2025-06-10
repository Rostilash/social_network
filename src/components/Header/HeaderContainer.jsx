import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthUser, loginThunk } from "../../redux/auth-reducer";
import { LoginForm } from "./../Login/Login";

class HeadeContainer extends React.Component {
  componentDidMount() {
    const username = "emilys"; //"emilys";
    const password = "emilyspass";
    this.props.loginThunk(username, password);
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({ data: state.auth.data, auth: state.auth.isAuth });

export default connect(mapStateToProps, { getAuthUser })(HeadeContainer);
