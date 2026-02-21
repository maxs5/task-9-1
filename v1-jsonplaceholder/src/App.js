import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { fetchTodos } from "./services/todoApi";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTodos() {
      try {
        setLoading(true);
        const data = await fetchTodos(controller.signal);
        setTodos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Ошибка загрузки");
        }
      } finally {
        setLoading(false);
      }
    }

    loadTodos();

    return () => controller.abort();
  }, []);

  return (
    <main className="page">
      <section className="card">
        <h1>Todo List (JSONPlaceholder)</h1>

        {loading && <p className="status">Загрузка...</p>}
        {error && <p className="status error">{error}</p>}
        {!loading && !error && <TodoList todos={todos} />}
      </section>
    </main>
  );
}
