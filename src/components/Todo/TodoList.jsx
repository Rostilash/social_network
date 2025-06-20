import React from "react";

export const TodoList = ({ todos, handleDelete, handleUpdateTodo }) => {
  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.task_date) return 1;
    if (!b.task_date) return -1;
    return a.task_date.localeCompare(b.task_date);
  });

  return (
    <>
      <h3>Завдання на сьогодні:</h3>
      {sortedTodos.map((todo) => (
        <div key={todo.id} style={{ width: "500px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input type="checkbox" checked={todo.completed === "1"} onChange={() => handleUpdateTodo(todo.id, todo.completed === "1" ? 0 : 1)} />
              <span style={{ color: todo.priority_color }}>{todo.title}</span>
            </div>
            <span>
              {todo.task_date || ""}{" "}
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                Видалити
              </button>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
