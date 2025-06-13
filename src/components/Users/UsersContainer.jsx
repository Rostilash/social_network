import React from "react";
import { follow, getUser, getUsers, setCurrentPage, toggleFollowingProgress, unfollow } from "../../redux/users-reducer";
import { connect } from "react-redux";
import { UsersC } from "./UsersC";
import { PreLoader } from "../common/Preloader/PreLoader";
import { compose } from "redux";

import {
  getCurrentPage,
  getFollowingInProgress,
  getIsAuth,
  getIsLoading,
  getTotalUsersCount,
  getPageSize,
  getUsersSelector,
} from "./../../redux/users-selectors";

class UsersСontainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage);
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUser(this.props.pageSize, pageNumber);
  };

  render() {
    return (
      <>
        {this.props.isLoading && this.props.isAuth === false ? <PreLoader /> : null}
        <UsersC
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isLoading: state.usersPage.isLoading,
//     followingInProgress: state.usersPage.followingInProgress,
//     isAuth: state.auth.isAuth,
//   };
// };

let mapStateToProps = (state) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state),
    isAuth: getIsAuth(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
    getUser,
  })
  // withRouter
)(UsersСontainer);
