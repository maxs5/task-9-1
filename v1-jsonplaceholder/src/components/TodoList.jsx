export default function TodoList({ todos }) {
  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <li key={todo.id} className="todoItem">
          <span>{todo.title}</span>
        </li>
      ))}
    </ul>
  );
}
