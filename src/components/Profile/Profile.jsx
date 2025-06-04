import React from "react";
import { addPostActionCreator } from "../../redux/profile-reducer";
import { updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import { Post } from "../MyPosts/Post";

export const Profile = (props) => {
  let postsElements = props.state.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} />);
  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;

    let action = updateNewMessageBodyCreator(text);
    props.dispatch(action);
  };
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea>
        </div>
        <button onClick={addPost}></button>
      </div>
      <div>{postsElements}</div>
    </div>
  );
};
