import React from "react";
import s from "./users.module.css";
import { NavLink } from "react-router-dom";
import { Paginator } from "./Paginator";
import { User } from "./User";

export const UsersC = ({
  currentPage,
  totalUsersCount,
  onPageChanged,
  pageSize,
  users,
  followingInProgress,
  follow,
  unfollow,
  toggleFollowingProgress,
  ...props
}) => {
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />

      {users.map((u) => (
        <User
          user={u}
          key={u.id}
          followingInProgress={followingInProgress}
          follow={follow}
          unfollow={unfollow}
          toggleFollowingProgress={toggleFollowingProgress}
        />
      ))}
    </div>
  );
};
