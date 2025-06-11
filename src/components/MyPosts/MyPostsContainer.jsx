import React from "react";
import { MyPosts } from "./MyPosts";
import { addPostActionCreator } from "../../redux/profile-reducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostsText,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPost: (text) => dispatch(addPostActionCreator(text)),
});

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
