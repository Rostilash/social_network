import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthUser } from "../../redux/auth-reducer";

class HeadeContainer extends React.Component {
  componentDidMount() {
    const username = ""; //"emilys";
    const password = "emilyspass";
    this.props.getAuthUser(username, password);
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({ data: state.auth.data, auth: state.auth.isAuth });

export default connect(mapStateToProps, { getAuthUser })(HeadeContainer);
