import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthUser } from "../../redux/auth-reducer";
import { authApi } from "../../api/api";

class HeadeContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUser();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({ data: state.auth.data, auth: state.auth.isAuth });

export default connect(mapStateToProps, { getAuthUser })(HeadeContainer);
