import React from "react";
import { FollowAC, setCurrentPageAC, setUsersAC, setUsersTotalCountAC, toggleLoadingAC, UnfollowAC } from "../../redux/users-reducer";
import { connect } from "react-redux";
import axios from "axios";
import { UsersC } from "./UsersC";
import { PreLoader } from "../common/Preloader/Preloader";

class UsersСontainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsLoading(true);
    axios
      .get(`https://dummyjson.com/users?limit=${this.props.pageSize}&skip=${(this.props.currentPage - 1) * this.props.pageSize}`)
      .then((response) => {
        this.props.toggleIsLoading(false);
        this.props.setUsers(response.data.users);
        this.props.setTotalUsersCOunt(response.data.total);
      });
  }
  onPageChanged = (pageNumber) => {
    this.props.toggleIsLoading(true);
    this.props.setCurrentPage(pageNumber);
    axios.get(`https://dummyjson.com/users?limit=${this.props.pageSize}&skip=${(pageNumber - 1) * this.props.pageSize}`).then((response) => {
      this.props.toggleIsLoading(false);
      this.props.setUsers(response.data.users);
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
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber));
    },
    setTotalUsersCOunt: (totalCount) => {
      dispatch(setUsersTotalCountAC(totalCount));
    },
    toggleIsLoading: (isLoading) => {
      dispatch(toggleLoadingAC(isLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersСontainer);
