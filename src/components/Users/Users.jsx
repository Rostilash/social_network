import React from "react";
import s from "./users.module.css";

export const Users = (props) => {
  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id} className={s.userContainer}>
          <span>
            <div>
              <img src={u.photoUrl} alt="" className={s.usersPhoto} />
            </div>

            <div>
              {!u.followed ? (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              )}
            </div>
          </span>
          <span className={s.userInfoContainer}>
            <span className={s.userContext}>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.city}</div>
              <div>{u.location.country}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
