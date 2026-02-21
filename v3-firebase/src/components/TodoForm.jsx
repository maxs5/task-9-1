export default function TodoForm({ value, onChange, onSubmit }) {
  return (
    <form className="row" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Введите новое дело"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
