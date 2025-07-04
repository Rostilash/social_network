import React, { useState } from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

export function Header(props) {
  return (
    <header className={s.header}>
      <h1>Мій сайт</h1>

      <div className={s.loginBlock}>
        {props.auth ? "Привіт " + props.data.firstName + " " + props.data.lastName + "!" : <NavLink to={"/login"}> Вхід</NavLink>}

        {props.auth && (
          <NavLink onClick={props.logout} style={{ cursor: "pointer" }} to={"/login"}>
            Вихід
          </NavLink>
        )}
      </div>
    </header>
  );
}
