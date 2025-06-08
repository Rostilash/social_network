import { authApi } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  data: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, data: action.data, isAuth: true };
    default:
      return state;
  }
};

export const setUserData = (data) => ({ type: SET_USER_DATA, data: data });

export const getAuthUser = (username, password) => {
  return (dispatch) => {
    authApi
      .getLogin(username, password)
      .then((data) => {
        if (data?.accessToken) {
          return authApi.getAuth(data.accessToken);
        }
      })
      .then((data) => {
        dispatch(setUserData(data));
      })
      .catch((err) => console.error(err.response?.data || err.message));
  };
};

export default authReducer;
