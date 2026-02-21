export default function TodoForm({ value, onChange, onSubmit }) {
  return (
    <form className="createForm" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите новое дело"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
