import React from "react";

export const Post = (props) => {
  return (
    <div>
      <b>Post Message: </b>
      {props.message}
      <br />
      <b>Likes: {props.likesCount}</b>
    </div>
  );
};
