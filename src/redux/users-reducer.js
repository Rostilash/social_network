import { usersApi } from "../api/api";
import { updateObjectInArray } from "../utils/helper/objects-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isLoading: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case TOGGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isLoading
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    }

    default:
      return state;
  }
};

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage });
export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading: isLoading });
export const toggleFollowingProgress = (isLoading, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress: isLoading, userId });

export const getUsers = (pageSize, page) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    const data = await usersApi.getUsers(pageSize, page);
    dispatch(toggleLoading(false));
    dispatch(setUsers(data.users));
    dispatch(setUsersTotalCount(data.total));
  };
};
export const getUser = (pageSize, pageNumber) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(false));
      const data = await usersApi.getUsers(pageSize, pageNumber);
      const usersWithFollowFlag = data.users.map((user) => ({
        ...user,
        followed: false,
      }));

      dispatch(setUsers(usersWithFollowFlag));
    } catch (error) {
      console.error("Помилка при завантаженні користувачів:", error);
    } finally {
      dispatch(toggleLoading(false));
    }
  };
};

export default usersReducer;
