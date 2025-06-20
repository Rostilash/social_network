import React, { useEffect, useState } from "react";
import "./TodoContainer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthThunk,
  deleteTodoListThunk,
  getTodoListThunk,
  getTodoStatusThunk,
  loginThunk,
  logoutUserThunk,
  postTodoListThunk,
  updateTodoListThunk,
  updateTodoStatusThunk,
} from "../../redux/todo-reducer";
import { LoginForm } from "./LoginForm";
import { StatusEditor } from "./StatusEditor";
import { TodoList } from "./TodoList";
import { AddTodo } from "./AddTodo";
import { selectIsTodoAuth, selectTodoData, selectTodoStatus, selectUserData } from "../../redux/users-selectors";

export const TodoContainer = () => {
  const dispatch = useDispatch();

  const todoData = useSelector(selectTodoData);
  const isTodoAuth = useSelector(selectIsTodoAuth);
  const userData = useSelector(selectUserData);
  const todoStatus = useSelector(selectTodoStatus);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [status, setStatus] = useState(todoStatus || "-------");
  const [statusChange, setStatusChange] = useState(false);
  const [todoMessage, setTodoMessage] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

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

  const sendTodo = (e) => {
    e.preventDefault();
    const time = new Date().toTimeString().split(" ")[0];
    dispatch(postTodoListThunk(todoMessage, category, priority, "0", time));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoListThunk(id));
  };

  const handleUpdateTodo = (id, completed) => {
    dispatch(updateTodoListThunk(id, completed));
  };

  const handleSelectChange = (e) => {
    setPriority(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("rememberme") === "true" && isTodoAuth === false) {
      dispatch(checkAuthThunk());
    }
  }, []);

  useEffect(() => {
    if (todoStatus) {
      setStatus(todoStatus);
    }
  }, [todoStatus]);

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
            <button onClick={() => dispatch(getTodoListThunk())}>Оновити список</button>
            <br />
            <span>Привіт: {userData.user.username} | </span>
            <button onClick={handleLogout}>Вихід</button>
          </div>

          <StatusEditor status={status || "-------"} setStatus={setStatus} onSave={saveStatus} editing={statusChange} setEditing={setStatusChange} />
        </>
      )}

      {isTodoAuth && todoData && (
        <>
          <AddTodo
            sendMessage={sendTodo}
            setMessage={setTodoMessage}
            message={todoMessage}
            priority={priority}
            category={category}
            handleSelectChange={handleSelectChange}
            handleCategoryChange={handleCategoryChange}
          />

          <TodoList todos={todoData} handleDelete={handleDeleteTodo} handleUpdateTodo={handleUpdateTodo} />
        </>
      )}
    </div>
  );
};
