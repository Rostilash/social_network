import React from "react";
import s from "./Pagintor.module.css";

export const Paginator = ({ currentPage, onPageChanged, totalUsersCount, pageSize }) => {
  let page = currentPage;
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={s.pagination}>
      {pages.map((p, index) => {
        return (
          <span
            key={index}
            className={page === p ? s.selectedPage : ""}
            onClick={() => {
              onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};
