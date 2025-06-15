import React from "react";
import s from "./Profile.module.css";
import { PreLoader } from "./../common/Preloader/PreLoader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export const Profile = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <PreLoader />;
  }

  const { firstName, lastName, image, age, id } = profile;

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
        <ProfileStatusWithHooks status={status} id={id} updateStatus={updateStatus} />
      </div>
      <div>
        <h1>Про користувача </h1>
        <div>Компанія: {profile.company.name}</div>
        <div>Крипто валюта: {profile.crypto.coin}</div>
        <div>Номер телефонеу: {profile.phone}</div>
        <div>Що використовуює користувач: {profile.userAgent}</div>
      </div>
    </div>
  );
};
