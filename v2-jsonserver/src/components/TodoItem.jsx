export default function TodoItem({
  todo,
  isEditing,
  editingText,
  onEditText,
  onBeginEdit,
  onSave,
  onCancel,
  onDelete
}) {
  return (
    <li className="todoItem">
      {isEditing ? (
        <>
          <input value={editingText} onChange={(e) => onEditText(e.target.value)} />
          <div className="actions">
            <button type="button" onClick={() => onSave(todo.id)}>
              Сохранить
            </button>
            <button type="button" onClick={onCancel}>
              Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <div className="actions">
            <button type="button" onClick={() => onBeginEdit(todo)}>
              Изменить
            </button>
            <button type="button" onClick={() => onDelete(todo.id)}>
              Удалить
            </button>
          </div>
        </>
      )}
    </li>
  );
}
