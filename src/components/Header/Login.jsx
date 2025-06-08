import React from "react";
import axios from "axios";

const Login = () => {
  // const handleLogin = async () => {
  //   try {
  //     const loginResponse = await axios
  //       .post("https://dummyjson.com/auth/login", {
  //         username: "kminchelle",
  //         password: "0lelplR",
  //       })
  //       .then((res) => console.log(res.data))
  //       .catch((err) => console.error(err.response?.data || err.message));
  //     console.error("Login error:", error.response?.data || error.message);
  //     console.log("Login successful:", loginResponse.data);
  //     const token = loginResponse.data.token;
  //     const profileResponse = await axios.get("https://dummyjson.com/auth/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("Protected data:", profileResponse.data);
  //   } catch (error) {
  //     console.error("Error:", error.response?.data || error.message);
  //   }
  // };
  // return <button onClick={handleLogin}>Login</button>;
};

export default Login;
