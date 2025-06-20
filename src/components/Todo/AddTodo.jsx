import React from "react";

export const AddTodo = ({ sendMessage, setMessage, message, priority, handleSelectChange, category, handleCategoryChange }) => {
  return (
    <form onSubmit={sendMessage}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <p>Пріоретети:</p>
      <select value={priority} onChange={handleSelectChange} required>
        <option value="" disabled>
          -- Виберіть пріоретет --
        </option>
        <option value="1">Низький</option>
        <option value="2">Середній</option>
        <option value="5">Високий</option>
      </select>
      <p>Категорії:</p>
      <select value={category} onChange={handleCategoryChange} required>
        <option value="" disabled>
          -- Виберіть категорію --
        </option>
        <option value="5">Сім'я</option>
        <option value="6">Друзі</option>
      </select>
      <br />
      <button type="submit">Надіслати</button>
    </form>
  );
};
