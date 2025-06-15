import React from "react";
import s from "./users.module.css";
import { NavLink } from "react-router-dom";

export const User = ({ user, toggleFollowingProgress, follow, unfollow, followingInProgress }) => {
  let u = user;
  return (
    <div key={user.id} className={s.userContainer}>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.image != null ? user.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJaa44hakF5skS3g1dAqjMEuMAR6MgAetFw&s"}
              alt=""
              className={s.usersPhoto}
            />
          </NavLink>
        </div>

        <div>
          {!user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                toggleFollowingProgress(true, user.id);
                follow(user.id);
                toggleFollowingProgress(false, user.id);
              }}
            >
              Follow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                toggleFollowingProgress(true, user.id);
                unfollow(user.id);
                toggleFollowingProgress(false, user.id);
              }}
            >
              Unfollow
            </button>
          )}
        </div>
      </span>
      <span className={s.userInfoContainer}>
        <span className={s.userContext}>
          <div>{user.firstName}</div>
          <div>{user.company.name}</div>
        </span>
        <span>
          <div>{user.address.city}</div>
          <div>{user.address.country}</div>
        </span>
      </span>
    </div>
  );
};
