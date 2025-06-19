export const StatusEditor = ({ status, setStatus, onSave, editing, setEditing }) => {
  if (!editing) {
    return <span onDoubleClick={() => setEditing(true)}>{status || "Немає статусу"}</span>;
  }

  return (
    <input
      autoFocus
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      onBlur={onSave}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSave();
      }}
    />
  );
};
