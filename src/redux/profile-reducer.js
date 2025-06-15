import { usersApi } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, message: "hi how are you?", likesCount: 12 },
    { id: 2, message: "WIll you help me?", likesCount: 1 },
    { id: 3, message: "something i can wtite", likesCount: 4 },
    { id: 4, message: "Realy?", likesCount: 5 },
  ],

  profile: null,
  status: "Сьогодні все",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: state.posts.length + 1,
        message: action.newText,
        likesCount: 0,
      };

      return { ...state, posts: [...state.posts, newPost], newPostsText: "" };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    }

    default:
      return state;
  }
};

export const addPostActionCreator = (text) => ({ type: ADD_POST, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status: status });
export const deletePost = (id) => ({ type: DELETE_POST, id });

export const getUserByUrlId = (userId) => {
  return (dispatch) => {
    usersApi.getUser(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export const updateStatus = (text) => {
  return (dispatch) => {
    dispatch(setStatus(text));
  };
};

export default profileReducer;
