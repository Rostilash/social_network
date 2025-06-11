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

export const loginThunk = (username, password, remember = "false", navigate) => {
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
          localStorage.setItem("token", JSON.stringify(data.accessToken));
        }
        if (navigate) {
          navigate("/");
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message || "Помилка авторизації";
        dispatch(setAuthError(errorMessage));
      });
  };
};
export const rememberLogin = () => {
  return (dispatch) => {
    return JSON.parse(localStorage.getItem("remember")) || [];
  };
};
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("remember");
    dispatch.loginThunk(null, null, null, null);
  };
};

export default authReducer;
