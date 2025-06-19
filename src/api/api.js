import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com/",
});
const localInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
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
    try {
      const obj = [{ id, text: setStatustext }];
      return localStorage.setItem("status", JSON.stringify(obj));
    } catch (error) {
      console.log("Файл не зміненно");
    }
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

export const todoApi = {
  async getLogin(username, password) {
    try {
      const response = await localInstance.post("api/login", { username, password });
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  async getUserTodos() {
    try {
      const response = await localInstance.get("api/todo");
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Користувач не авторизований");
      } else {
        console.error("Помилка:", error.message);
      }
    }
  },
  async logoutUser() {
    try {
      const response = await localInstance.post("api/logout", null);
      return response.data.message;
    } catch (error) {
      console.log("Не вдалося вийти");
    }
  },
  async checkUserAuth() {
    const response = await localInstance.get("api/me");
    return { user: response.data };
  },
  async getStatus() {
    const response = await localInstance.get("api/status");
    return response.data.status;
  },
  async updateStatus(value) {
    const response = await localInstance.put("api/status", { status_text: value });
    return response.data.message;
  },
};
