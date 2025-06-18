const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./pgsql");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Головна сторінка");
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todolist.user_data");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Помилка при отриманні користувачів" });
  }
});

app.get("/api/todo", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todolist.task");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Помилка при отриманні користувачів" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
