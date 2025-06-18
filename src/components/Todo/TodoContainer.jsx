import axios from "axios";
import React, { useEffect, useState } from "react";

export const TodoContainer = () => {
  const [users, setUsers] = useState([]);
  const [TodoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/todo").then((res) => setTodoList(res.data));
  }, []);

  return (
    <div>
      <h1>users</h1>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
      <h1>todo</h1>
      {TodoList.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};
