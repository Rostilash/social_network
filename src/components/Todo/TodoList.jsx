import React from "react";

export const TodoList = ({ todos }) => (
  <>
    <h3>Завдання на сьогодні:</h3>
    {todos.map((todo) => (
      <div key={todo.id}>
        <input type="checkbox" checked={todo.completed === "1"} readOnly />
        <span style={{ color: todo.priority_color }}>{todo.title}</span>
      </div>
    ))}
  </>
);
