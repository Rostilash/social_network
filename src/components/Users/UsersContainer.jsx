import React from "react";
import { Users } from "./Users";
import { FollowAC, setUsersAC, UnfollowAC } from "../../redux/users-reducer";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(FollowAC(userId));
    },
    unfollow: (userId) => {
      dispatch(UnfollowAC(userId));
    },
    setUsersAC: (users) => {
      dispatch(setUsersAC(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
