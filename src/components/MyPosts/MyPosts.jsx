import React from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post";
import { useForm } from "react-hook-form";

export const MyPosts = React.memo(({ posts, addPost }) => {
  console.log("MyPosts rerender", posts);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    addPost(data.newPostText);
    reset();
  };

  let postsElements = posts.map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            {...register("newPostText", {
              required: "Поле не може бути порожнім",
              maxLength: { value: 200, message: "Максимум 200 символів" },
            })}
            placeholder="Напиши новий пост..."
          />
          {errors.newPostText && <p style={{ color: "red" }}>{errors.newPostText.message}</p>}
        </div>
        <button type="submit">Надіслати</button>
      </form>

      <div>{postsElements}</div>
    </div>
  );
});
