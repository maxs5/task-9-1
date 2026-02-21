import TodoItem from "./TodoItem";

export default function TodoList(props) {
  const {
    todos,
    editingId,
    editingText,
    onEditText,
    onBeginEdit,
    onSave,
    onCancel,
    onDelete
  } = props;

  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          editingText={editingText}
          onEditText={onEditText}
          onBeginEdit={onBeginEdit}
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
