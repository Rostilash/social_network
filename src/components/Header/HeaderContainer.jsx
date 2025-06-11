import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { loginThunk, rememberLogin, logout } from "../../redux/auth-reducer";

class HeadeContainer extends React.Component {
  componentDidMount() {
    const { login, password } = this.props.rememberLogin();
    if (!login) return;
    this.props.loginThunk(login, password);
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({ data: state.auth.data, auth: state.auth.isAuth });

export default connect(mapStateToProps, { loginThunk, rememberLogin, logout })(HeadeContainer);
