import React from "react";
import { follow, setCurrentPage, setUsers, setUsersTotalCount, toggleFollowingProgress, toggleLoading, unfollow } from "../../redux/users-reducer";
import { connect } from "react-redux";
import { UsersC } from "./UsersC";
import { PreLoader } from "../common/Preloader/PreLoader";
import { usersApi } from "../../api/api";

class UsersСontainer extends React.Component {
  componentDidMount() {
    this.props.toggleLoading(true);

    usersApi.getUsers(this.props.pageSize, this.props.currentPage).then((data) => {
      this.props.toggleLoading(false);
      this.props.setUsers(data.users);
      this.props.setUsersTotalCount(data.total);
    });
  }

  onPageChanged = (pageNumber) => {
    this.props.toggleLoading(true);
    this.props.setCurrentPage(pageNumber);

    usersApi
      .getUsers(this.props.pageSize, pageNumber)
      .then((data) => {
        this.props.toggleLoading(false);
        const usersWithFollowFlag = data.users.map((user) => ({
          ...user,
          followed: false,
        }));

        this.props.setUsers(usersWithFollowFlag);
      })
      .catch((error) => {
        this.props.toggleLoading(false);
        console.error("Помилка при завантаженні користувачів:", error);
      });
  };

  render() {
    return (
      <>
        {this.props.isLoading ? <PreLoader /> : null}
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

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(FollowAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(UnfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setTotalUsersCOunt: (totalCount) => {
//       dispatch(setUsersTotalCountAC(totalCount));
//     },
//     toggleIsLoading: (isLoading) => {
//       dispatch(toggleLoadingAC(isLoading));
//     },
//   };
// };

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setUsersTotalCount,
  toggleLoading,
  toggleFollowingProgress,
})(UsersСontainer);
