import { get, push, ref, remove, set } from "firebase/database";
import { db } from "../firebase";

export async function getTodos() {
  const snapshot = await get(ref(db, "todos"));
  const value = snapshot.val() || {};
  return Object.entries(value).map(([id, item]) => ({ id, ...item }));
}

export async function createTodo(title) {
  const todosRef = ref(db, "todos");
  const itemRef = push(todosRef);
  await set(itemRef, { title });
  return { id: itemRef.key, title };
}

export async function updateTodo(id, title) {
  await set(ref(db, `todos/${id}`), { title });
  return { id, title };
}

export async function deleteTodo(id) {
  await remove(ref(db, `todos/${id}`));
}
