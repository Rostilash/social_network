import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../redux/profile-reducer";
import { Post } from "./Post";
import s from "./MyPosts.module.css";

export const MyPosts = (props) => {
  let postsElements = props.state.posts.map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;

    let action = updateNewPostTextActionCreator(text);
    props.dispatch(action);
  };
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={props.state.newPostText}></textarea>
        </div>
        <button onClick={addPost}>Надіслати</button>
      </div>
      <div>{postsElements}</div>
    </div>
  );
};
