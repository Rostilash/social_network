import React, { useEffect } from "react";
import s from "./Login.module.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";

const Login = ({ isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

const mapStateToProps = (state) => ({ data: state.auth.data, isAuth: state.auth.isAuth });

export default connect(mapStateToProps, {})(Login);
