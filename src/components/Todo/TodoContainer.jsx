import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TodoContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthThunk, getTodoListThunk, loginThunk, logoutUserThunk } from "../../redux/todo-reducer";

export const TodoContainer = () => {
  const dispatch = useDispatch();

  const { isTodoAuth, data, error, todoData } = useSelector((state) => state.todo);

  const [username, setUsername] = useState("Rostik");
  const [password, setPassword] = useState("123456");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk(username, password, remember));
  };

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (localStorage.getItem("rememberme") === "true") {
      dispatch(checkAuthThunk());
    }
  }, []);

  useEffect(() => {
    if (isTodoAuth) {
      dispatch(getTodoListThunk());
    }
  }, [isTodoAuth, data]);

  return (
    <div>
      <p>{error}</p>

      {isTodoAuth && <span>Привіт: {data.user.username}</span>}

      {!isTodoAuth && (
        <>
          <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="username"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              name="rememberme"
              type="checkbox"
              text="Запам'ятати мене"
              checked={remember}
              onChange={() => {
                setRemember((prev) => !prev);
              }}
            />

            <button type="sumbit">Log In</button>
          </form>
        </>
      )}

      {isTodoAuth && (
        <>
          <button onClick={handleLogout}>Вихід</button>
          <h3>Завдання на сьогодні:</h3>
          {todoData &&
            todoData.map((todo) => (
              <div key={todo.id}>
                <input type="checkbox" id={`checkbox-${todo.id}`} checked={todo.completed === "1"} readOnly />

                <span style={{ color: todo.priority_color }}>{todo.title}</span>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
