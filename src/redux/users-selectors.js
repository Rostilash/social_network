import { createSelector } from "reselect";

//Primitive selectors
export const getUsersSelector = (state) => {
  return state.usersPage.users;
};
//reselect dependencies - getUsersSelector
export const getUsersSuper = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getIsLoading = (state) => {
  return state.usersPage.isLoading;
};

export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
};

export const getIsAuth = (state) => {
  return state.auth.isAuth;
};
