import { todoApi } from "../api/api";

const SET_USER_TODO_DATA = "SET_USER_TODO_DATA";
const SET_AUTH_TODO_ERROR = "SET_AUTH_TODO_ERROR";
const SET_TODO_LIST = "SET_TODO_LIST";
const CLEAR_TODO_USER_DATA = "CLEAR_TODO_USER_DATA";
const SET_TODO_STATUS = "SET_TODO_STATUS";

let initialState = {
  isTodoAuth: false,
  data: null,
  todoData: null,
  error: null,
  todo_status: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TODO_DATA:
      return { ...state, data: action.data, isTodoAuth: true };
    case SET_AUTH_TODO_ERROR:
      return { ...state, error: action.error };
    case SET_TODO_LIST:
      return { ...state, todoData: action.todoData };
    case CLEAR_TODO_USER_DATA:
      return { ...state, isTodoAuth: false };
    case SET_TODO_STATUS:
      return { ...state, todo_status: action.todo_status };
    default:
      return state;
  }
};

export const setTodoUserData = (data) => ({ type: SET_USER_TODO_DATA, data: data });
export const setAuthError = (error) => ({ type: SET_AUTH_TODO_ERROR, error });
export const setTodoList = (todoData) => ({ type: SET_TODO_LIST, todoData });
export const setTodoStatus = (todo_status) => ({ type: SET_TODO_STATUS, todo_status });
export const clearTodoUserData = () => ({ type: CLEAR_TODO_USER_DATA });

export const loginThunk = (username, password, remember = "false") => {
  return async (dispatch) => {
    try {
      const userData = await todoApi.getLogin(username, password);
      dispatch(setTodoUserData(userData));

      if (remember) {
        localStorage.setItem("rememberme", "true");
      } else {
        localStorage.removeItem("rememberme");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Помилка авторизації";
      dispatch(setAuthError(errorMessage));
    }
  };
};

export const checkAuthThunk = () => {
  return async (dispatch) => {
    try {
      const userData = await todoApi.checkUserAuth();
      dispatch(setTodoUserData(userData));
    } catch (error) {
      dispatch(clearTodoUserData());
    }
  };
};

export const logoutUserThunk = () => {
  return async (dispatch) => {
    await todoApi.logoutUser();
    dispatch(clearTodoUserData());
    localStorage.removeItem("rememberme");
  };
};

export const getTodoListThunk = () => {
  return async (dispatch) => {
    try {
      const todoData = await todoApi.getUserTodos();
      dispatch(setTodoList(todoData));
    } catch (error) {
      console.log("Нема ніяких завдань на поточний день");
      dispatch(setAuthError(errorMessage));
    }
  };
};

export const getTodoStatusThunk = () => {
  return async (dispatch) => {
    try {
      const statusData = await todoApi.getStatus();
      dispatch(setTodoStatus(statusData));
    } catch (error) {
      console.log("Cтатус не знайдено");
      dispatch(setTodoStatus(error.message));
    }
  };
};

export const updateTodoStatusThunk = (value) => {
  return async (dispatch) => {
    try {
      await todoApi.updateStatus(value);
      dispatch(setTodoStatus(value));
    } catch (error) {
      console.log("Cтатус не знайдено");
      dispatch(setTodoStatus(error.message));
    }
  };
};

export default todoReducer;
