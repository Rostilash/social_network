import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/auth-reducer";
import s from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  login: Yup.string()
    .required("Логін обов’язковий")
    .min(4, "Мінімум 4 символи")
    .max(16, "Максимум 16 символів")
    .matches(/^[a-zA-Z0-9_]+$/, "Тільки латинські букви, цифри та _"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Пароль обов’язковий"),
  remember: Yup.boolean(),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(loginThunk(data.login, data.password, data.remember, navigate));

    if (data.remember === true) {
      const user = { login: data.login, password: data.password };
      localStorage.setItem("remember", JSON.stringify(user));
    }

    reset({
      login: "",
      password: "",
      remember: false,
    });
  };

  // emilys emilyspass
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ЛОГІН */}
      <div>
        <input type="text" placeholder="login" {...register("login")} className={touchedFields.login && errors.login ? s.error_input : ""} />
        {touchedFields.login && <p style={{ color: "red" }}>{!watch("login") ? "Поле не заповнено" : errors.login?.message}</p>}
      </div>

      {/* ПАРОЛЬ */}
      <div>
        <input
          type="password"
          placeholder="password"
          {...register("password")}
          className={touchedFields.password && errors.password ? s.error_input : ""}
        />
        {touchedFields.password && <p style={{ color: "red" }}>{!watch("password") ? "Поле не заповнено" : errors.password?.message}</p>}
      </div>

      {/* REMEMBER */}
      <div>
        <input type="checkbox" {...register("remember")} /> remember me
      </div>

      {/* Глобальна помилка */}
      {authError && <p style={{ color: "red" }}>{authError}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

const Login = (props) => {
  const navigate = useNavigate();
  if (props.isAuth) {
    navigate("/");
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

const mapStateToProps = (state) => ({ data: state.auth.data, isAuth: state.auth.isAuth });

export default connect(mapStateToProps, {})(Login);
