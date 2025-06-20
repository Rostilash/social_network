require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();
const pool = require("./pgsql");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// console.log("SESSION_SECRET:", process.env.SESSION_SECRET);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

function isAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Не авторизований" });
  }
}
// current user app open
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todolist.user_data");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Помилка при отриманні користувачів" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM todolist.user_data WHERE username = $1", [username]);

    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Невірний пароль" });
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({ message: "Успішний логін", user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Ви вийшли з системи" });
  });
});

app.get("/api/me", (req, res) => {
  if (req.session.userId) {
    res.json({ id: req.session.userId, username: req.session.username });
  } else {
    res.status(401).json({ message: "Не авторизований" });
  }
});
// current user app close
app
  .route("/api/status")
  .all(isAuth)

  .get(async (req, res) => {
    const userId = req.session.userId;
    try {
      const result = await pool.query("SELECT status_text FROM todolist.status WHERE user_id = $1", [userId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Статус не знайдено" });
      }
      res.json({ status: result.rows[0].status_text });
    } catch (error) {
      console.error("Помилка при отриманні статусу:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  })
  .post(async (req, res) => {
    const userId = req.session.userId;
    const { status_text, created_at } = req.body;
    try {
      const exists = await pool.query("SELECT 1 FROM todolist.status WHERE user_id = $1", [userId]);
      if (exists.rows.length > 0) {
        return res.status(400).json({ message: "Статус вже існує, використовуйте PUT для оновлення" });
      }
      await pool.query("INSERT INTO todolist.status (user_id, status_text,created_at) VALUES ($1, $2, $3)", [userId, status_text, created_at]);
      res.json({ message: "Статус створено" });
    } catch (error) {
      console.error("Помилка при створенні статусу:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  })
  .put(async (req, res) => {
    const userId = req.session.userId;
    const { status_text } = req.body;
    try {
      const result = await pool.query("UPDATE todolist.status SET status_text = $1 WHERE user_id = $2", [status_text, userId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Статус не знайдено" });
      }
      res.json({ message: "Статус оновлено" });
    } catch (error) {
      console.error("Помилка при оновленні статусу:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  });

app.get("/api/todo", isAuth, async (req, res) => {
  try {
    const userId = req.session.userId;

    const result = await pool.query(
      `
      SELECT 
        task.*, 
        category.title AS category_title, 
        priority.title AS priority_title, 
        priority.color AS priority_color
      FROM todolist.task AS task
      LEFT JOIN todolist.category AS category ON task.category_id = category.id
      LEFT JOIN todolist.priority AS priority ON task.priority_id = priority.id
      WHERE task.user_id = $1;
    `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Помилка при отриманні задач із категорією та пріоритетом" });
  }
});

app.post("/api/todo", isAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const { title, category_id, priority_id, completed, task_date } = req.body;

    const parsedCategoryId = parseInt(category_id, 10);
    const parsedPriorityId = parseInt(priority_id, 10);
    const parsedCompleted = completed === "0" || completed === 0 || completed === false ? 0 : 1;

    const result = await pool.query(
      `INSERT INTO todolist.task (user_id, title, category_id, priority_id, completed, task_date)
      VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *;`,
      [userId, title, parsedCategoryId, parsedPriorityId, parsedCompleted, task_date]
    );

    res.status(201).json({ message: "Завдання створено", task: result.rows[0] });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ error: "Помилка при створенні задачі" });
  }
});

app.delete("/api/todo/:id", isAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const taskId = parseInt(req.params.id, 10);

    const result = await pool.query(
      `DELETE FROM todolist.task 
      WHERE id = $1 AND user_id = $2
       RETURNING *;`,
      [taskId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Задача не знайдена або ви не маєте доступу" });
    }

    res.status(200).json({ message: "Задача видалена", deletedTask: result.rows[0] });
  } catch (err) {
    console.error("❌ DB error при видаленні:", err.message);
    res.status(500).json({ error: "Помилка при видаленні задачі" });
  }
});

app.put("/api/todo/:id", isAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const taskId = parseInt(req.params.id, 10);
    const { completed } = req.body;

    const parsedCompleted = completed === true || completed === "1" || completed === 1 ? 1 : 0;

    const result = await pool.query(
      `UPDATE todolist.task
      SET completed = $1
      WHERE id = $2 AND user_id = $3
       RETURNING *;`,
      [parsedCompleted, taskId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Задача не знайдена або ви не маєте доступу" });
    }

    res.status(200).json({ message: "Статус завдання оновлено", task: result.rows[0] });
  } catch (err) {
    console.error("❌ DB error при оновленні:", err.message);
    res.status(500).json({ error: "Помилка при оновленні задачі" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
