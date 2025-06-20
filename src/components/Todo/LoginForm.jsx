import React from "react";

export const LoginForm = ({ formData, onChange, onSubmit }) => {
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" value={formData.username} onChange={onChange} placeholder="username" />
        <input type="password" name="password" placeholder="password" value={formData.password} onChange={onChange} />
        <input type="checkbox" name="remember" text="Запам'ятати мене" checked={formData.remember} onChange={onChange} /> Запам'ятати мене
        <button type="sumbit">Log In</button>
      </form>
    </>
  );
};
