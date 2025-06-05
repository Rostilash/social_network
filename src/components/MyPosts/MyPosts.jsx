import React from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post";

export const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);
  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea>
        </div>
        <button onClick={onAddPost}>Надіслати</button>
      </div>
      <div>{postsElements}</div>
    </div>
  );
};
