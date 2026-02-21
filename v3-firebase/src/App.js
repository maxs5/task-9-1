import { useEffect, useMemo, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoToolbar from "./components/TodoToolbar";
import { useDebounce } from "./hooks/useDebounce";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./services/todoApi";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortEnabled, setSortEnabled] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(searchText.trim().toLowerCase(), 350);

  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true);
        setError("");
        const list = await getTodos();
        setTodos(list);
      } catch (err) {
        setError(err.message || "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  async function addTodo(event) {
    event.preventDefault();
    const title = newText.trim();
    if (!title) return;

    try {
      const created = await createTodo(title);
      setTodos((prev) => [...prev, created]);
      setNewText("");
    } catch (err) {
      setError(err.message || "Ошибка добавления");
    }
  }

  function beginEdit(todo) {
    setEditingId(todo.id);
    setEditingText(todo.title);
  }

  function cancelEdit() {
    setEditingId("");
    setEditingText("");
  }

  async function saveEdit(id) {
    const title = editingText.trim();
    if (!title) return;

    try {
      const updated = await updateTodo(id, title);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
      cancelEdit();
    } catch (err) {
      setError(err.message || "Ошибка обновления");
    }
  }

  async function removeTodo(id) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message || "Ошибка удаления");
    }
  }

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(debouncedSearch)
    );

    if (!sortEnabled) return filtered;
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "ru"));
  }, [todos, debouncedSearch, sortEnabled]);

  return (
    <main className="page">
      <section className="card">
        <h1>Todo List (Firebase)</h1>

        <TodoForm value={newText} onChange={setNewText} onSubmit={addTodo} />
        <TodoToolbar
          searchText={searchText}
          onSearch={setSearchText}
          sortEnabled={sortEnabled}
          onToggleSort={() => setSortEnabled((prev) => !prev)}
        />

        {loading && <p className="status">Загрузка...</p>}
        {error && <p className="status error">{error}</p>}

        {!loading && (
          <TodoList
            todos={visibleTodos}
            editingId={editingId}
            editingText={editingText}
            onEditText={setEditingText}
            onBeginEdit={beginEdit}
            onSave={saveEdit}
            onCancel={cancelEdit}
            onDelete={removeTodo}
          />
        )}
      </section>
    </main>
  );
}
