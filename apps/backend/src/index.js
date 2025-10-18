const express = require("express");
const cors = require("cors"); // <-- import cors
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // <-- enable CORS for all origins
app.use(express.json());

let todos = [{ id: 1, text: "Sample Todo", done: false }, { id: 2, text: "Sample Todo 2", done: false }];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const t = { id: Date.now(), text: req.body.text, done: false };
  todos.push(t);
  res.status(201).json(t);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
