import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer.js";

let initialState = {
  posts: [
    { id: 1, message: "hi how are you?", likesCount: 12 },
    { id: 2, message: "Will you help me?", likesCount: 1 },
    { id: 3, message: "something I can write", likesCount: 4 },
    { id: 4, message: "Really?", likesCount: 5 },
  ],
};

it("length of posts should be incremented", () => {
  const action = addPostActionCreator("Some new dimension");

  const newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(5);
});

it("message of new post should be correct", () => {
  const action = addPostActionCreator("Some new dimension");

  const newState = profileReducer(initialState, action);

  expect(newState.posts.at(-1).message).toBe("Some new dimension");
});

it("after deleting length of messages should be decrement", () => {
  const action = deletePost(1);

  const newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(3);
});

it("after deleting post shoudn`t deleted if id will add wrong id", () => {
  const action = deletePost(1000);

  const newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(initialState.posts.length);
});
