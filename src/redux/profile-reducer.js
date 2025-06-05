const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
  posts: [
    { id: 1, message: "hi how are you?", likesCount: 12 },
    { id: 2, message: "WIll you help me?", likesCount: 1 },
    { id: 3, message: "something i can wtite", likesCount: 4 },
    { id: 4, message: "Realy?", likesCount: 5 },
  ],
  newPostsText: "new-text",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 6,
        message: state.newPostsText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost], newPostsText: "" };
    }
    case UPDATE_NEW_POST_TEXT: {
      return { ...state, newPostsText: action.newText };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;
