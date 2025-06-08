import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { setUserData } from "../../redux/auth-reducer";
import { authApi } from "../../api/api";

class HeadeContainer extends React.Component {
  componentDidMount() {
    authApi
      .getLogin()
      .then((data) => {
        if (data?.accessToken) {
          return authApi.getAuth(data.accessToken);
        }
      })
      .then((data) => {
        this.props.setUserData(data);
      })
      .catch((err) => console.error(err.response?.data || err.message));
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({ data: state.auth.data, auth: state.auth.isAuth });

export default connect(mapStateToProps, { setUserData })(HeadeContainer);
