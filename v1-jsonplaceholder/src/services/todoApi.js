export async function fetchTodos(signal) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20", {
    signal
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить список дел");
  }

  return response.json();
}
