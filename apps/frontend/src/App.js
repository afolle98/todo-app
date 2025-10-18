import React, { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  async function addTodo() {
    const res = await fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setTodos([...todos, await res.json()]);
    setText("");
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}
