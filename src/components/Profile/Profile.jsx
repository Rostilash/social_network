import React from "react";
import s from "./Profile.module.css";
import { PreLoader } from "./../common/Preloader/PreLoader";

export const Profile = (props) => {
  if (!props.profile) {
    return <PreLoader />;
  }

  const { firstName, lastName, image, age } = props.profile;
  return (
    <div className={s.profile_page}>
      <div>
        <div className={s.image}>
          <img src={image} alt="image" />
        </div>
        <div className={s.header}>
          Фіо: {firstName} {lastName}
        </div>
        <div>Років: {age}</div>
      </div>
      <div>
        <h1>Про користувача </h1>
        <div>Компанія: {props.profile.company.name}</div>
        <div>Крипто валюта: {props.profile.crypto.coin}</div>
        <div>Номер телефонеу: {props.profile.phone}</div>
        <div>Що використовуює користувач: {props.profile.userAgent}</div>
      </div>
    </div>
  );
};
