import React from "react";
import { Header } from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setUserData } from "../../redux/auth-reducer";

class HeadeContainer extends React.Component {
  componentDidMount() {
    axios
      .post("https://dummyjson.com/auth/login", {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
      })
      .then((res) => {
        const { accessToken } = res.data;
        if (accessToken) {
          return axios.get("https://dummyjson.com/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      })
      .then((userRes) => {
        this.props.setUserData(userRes.data);
      })
      .catch((err) => console.error(err.response?.data || err.message));
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({ data: state.auth.data, auth: state.auth.isAuth });

export default connect(mapStateToProps, { setUserData })(HeadeContainer);
