const express = require("express");
const cors = require("cors"); // <-- import cors
const { Pool } = require("pg"); // Postgres client
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // <-- enable CORS for all origins
app.use(express.json());

// Connect to Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Ensure todos table exists (run once at startup)
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE
  );
`);

app.get("/api/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  res.json(result.rows);
});

app.post("/api/todos", async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    "INSERT INTO todos(text, done) VALUES($1, $2) RETURNING *",
    [text, false]
  );
  res.status(201).json(result.rows[0]);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
