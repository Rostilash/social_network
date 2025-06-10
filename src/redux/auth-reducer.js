import { authApi } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_AUTH_ERROR = "SET_AUTH_ERROR";

let initialState = {
  data: null,
  isAuth: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, data: action.data, isAuth: true };
    case SET_AUTH_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setUserData = (data) => ({ type: SET_USER_DATA, data: data });
export const setAuthError = (error) => ({ type: SET_AUTH_ERROR, error });

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

export const loginThunk = (username, password, remember) => {
  return (dispatch) => {
    authApi
      .getLogin(username, password)
      .then((data) => {
        if (data?.accessToken) {
          return authApi.getAuth(data.accessToken);
        } else {
          throw new Error("Невірний логін або пароль");
        }
      })
      .then((data) => {
        dispatch(setUserData(data));
        if (remember) {
          localStorage.setItem("token", data.accessToken); // збереження токена
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message || "Помилка авторизації";
        dispatch(setAuthError(errorMessage));
      });
  };
};

export default authReducer;
