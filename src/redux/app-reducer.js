import { loginThunk, rememberLogin } from "./auth-reducer";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return { ...state, initialized: action.initialized };
    default:
      return state;
  }
};

export const initialazedSuccess = (initialized) => ({ type: SET_INITIALIZED_SUCCESS, initialized: initialized });

export const initializeApp = () => async (dispatch) => {
  try {
    const credentials = rememberLogin();
    if (credentials?.login && credentials?.password) {
      await dispatch(loginThunk(credentials.login, credentials.password));
    }
  } catch (err) {
    console.error("Login failed during initialization:", err);
  } finally {
    dispatch(initialazedSuccess(true));
  }
};

export default appReducer;
