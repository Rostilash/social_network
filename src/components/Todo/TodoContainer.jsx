import React, { useEffect, useState } from "react";
import "./TodoContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthThunk, getTodoListThunk, getTodoStatusThunk, loginThunk, logoutUserThunk, updateTodoStatusThunk } from "../../redux/todo-reducer";
import { LoginForm } from "./LoginForm";
import { StatusEditor } from "./StatusEditor";
import { TodoList } from "./TodoList";

export const TodoContainer = () => {
  const dispatch = useDispatch();

  const isTodoAuth = useSelector((state) => state.todo.isTodoAuth);
  const todo_status = useSelector((state) => state.todo.todo_status);
  const todoData = useSelector((state) => state.todo.todoData);
  const data = useSelector((state) => state.todo.data);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [status, setStatus] = useState(todo_status || "-------");
  const [statusChange, setStatusChange] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk(formData.username, formData.password, formData.remember));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  const saveStatus = () => {
    dispatch(updateTodoStatusThunk(status));
    setStatusChange(false);
  };

  useEffect(() => {
    if (localStorage.getItem("rememberme") === "true" && isTodoAuth === false) {
      dispatch(checkAuthThunk());
    }
  }, []);

  useEffect(() => {
    if (todo_status) {
      setStatus(todo_status);
    }
  }, [todo_status]);

  useEffect(() => {
    if (isTodoAuth) {
      dispatch(getTodoListThunk());
      dispatch(getTodoStatusThunk());
    }
  }, [isTodoAuth]);

  return (
    <div>
      {!isTodoAuth && <LoginForm formData={formData} onChange={handleChange} onSubmit={handleLogin} />}

      {isTodoAuth && (
        <>
          <div>
            <span>Привіт: {data.user.username} | </span>
            <button onClick={handleLogout}>Вихід</button>
          </div>

          <StatusEditor status={status || "-------"} setStatus={setStatus} onSave={saveStatus} editing={statusChange} setEditing={setStatusChange} />
        </>
      )}

      {isTodoAuth && todoData && <TodoList todos={todoData} />}
    </div>
  );
};
