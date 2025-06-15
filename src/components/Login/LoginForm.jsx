import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/auth-reducer";
import { Input } from "../common/FormsControls/FormsControls";

const schema = Yup.object().shape({
  login: Yup.string()
    .required("Логін обов’язковий")
    .min(4, "Мінімум 4 символи")
    .max(16, "Максимум 16 символів")
    .matches(/^[a-zA-Z0-9_]+$/, "Тільки латинські букви, цифри та _"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Пароль обов’язковий"),
  remember: Yup.boolean(),
});

// emilyspass - password emily login (for rest api auth)

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

  const onSubmit = (data) => {
    dispatch(loginThunk(data.login, data.password, data.remember));
    if (data.remember) {
      localStorage.setItem("remember", JSON.stringify({ login: data.login, password: data.password }));
    }
    reset({ login: "", password: "", remember: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="login" placeholder="Login" register={register} errors={errors} touchedFields={touchedFields} watch={watch} />
      <Input name="password" type="password" placeholder="Password" register={register} errors={errors} touchedFields={touchedFields} watch={watch} />
      <Input
        name="remember"
        type="checkbox"
        text="Запам'ятати мене"
        register={register}
        errors={errors}
        touchedFields={touchedFields}
        watch={watch}
      />

      {authError && <p style={{ color: "red" }}>{authError}</p>}
      <button type="submit">Увійти</button>
    </form>
  );
};
