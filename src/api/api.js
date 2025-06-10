import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com/",
});

export const usersApi = {
  getUser(userId = 1) {
    return instance.get(`users/${userId}`).then((response) => {
      return response.data;
    });
  },

  getUsers(pageSize = 5, currentPage = 1) {
    return instance.get(`users?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}`).then((response) => {
      return response.data;
    });
  },

  getStatus() {
    return JSON.parse(localStorage.getItem("status")) || [];
  },

  setStatus(setStatustext, id) {
    const obj = [{ id, text: setStatustext }];
    return localStorage.setItem("status", JSON.stringify(obj));
  },
};

export const authApi = {
  getLogin(username, password) {
    return instance
      .post("auth/login", {
        username: username,
        password: password,
        expiresInMins: 30,
      })
      .then((res) => {
        return res.data;
      });
  },
  getAuth(accessToken) {
    return instance
      .get("auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
};
