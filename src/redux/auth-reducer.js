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

export const loginThunk = (username, password, remember = "false") => {
  return async (dispatch) => {
    try {
      const loginData = await authApi.getLogin(username, password);
      if (!loginData?.accessToken) {
        throw new Error("Невірний логін або пароль");
      }

      const userData = await authApi.getAuth(loginData.accessToken);
      dispatch(setUserData(userData));

      if (remember) {
        localStorage.setItem("remember", JSON.stringify({ login: username, password }));
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Помилка авторизації";
      dispatch(setAuthError(errorMessage));
    }
  };
};

export const rememberLogin = () => {
  return JSON.parse(localStorage.getItem("remember")) || {};
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("remember");
    dispatch.loginThunk(null, null, null, null);
  };
};

export default authReducer;
