import React from "react";
import s from "./users.module.css";
import axios from "axios";

export const Users = (props) => {
  if (props.users.length === 0) {
    axios.get("https://dummyjson.com/users").then((response) => {
      props.setUsers(response.data.users);
    });
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id} className={s.userContainer}>
          <span>
            <div>
              <img
                src={u.image != null ? u.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJaa44hakF5skS3g1dAqjMEuMAR6MgAetFw&s"}
                alt=""
                className={s.usersPhoto}
              />
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
              <div>{u.firstName}</div>
              <div>{u.company.name}</div>
            </span>
            <span>
              <div>{u.address.city}</div>
              <div>{u.address.country}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
