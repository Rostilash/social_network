import React from "react";
import s from "./users.module.css";
import { NavLink } from "react-router-dom";

export const UsersC = (props) => {
  let page = props.currentPage;
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={s.pagination}>
        {pages.map((p, index) => {
          return (
            <span
              key={index}
              className={page === p ? s.selectedPage : ""}
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>

      {props.users.map((u) => (
        <div key={u.id} className={s.userContainer}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.image != null ? u.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJaa44hakF5skS3g1dAqjMEuMAR6MgAetFw&s"}
                  alt=""
                  className={s.usersPhoto}
                />
              </NavLink>
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
