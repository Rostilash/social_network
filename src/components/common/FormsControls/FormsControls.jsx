import React from "react";
import s from "./FormsControls.module.css";

export const Input = ({ name, type = "text", placeholder = "Введіть значення", text = "", register, errors, touchedFields, watch }) => {
  const value = watch(name);
  const hasError = touchedFields?.[name] && errors?.[name];

  return (
    <div>
      <input type={type} placeholder={placeholder} {...register(name)} className={hasError ? s.error_input : ""} />
      {text}
      {hasError && <p style={{ color: "red" }}>{value ? errors[name]?.message : "Поле не заповнено"}</p>}
    </div>
  );
};
