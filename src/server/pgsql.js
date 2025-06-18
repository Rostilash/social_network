const { Pool } = require("pg");
//while its testing we didnt throw information on env file
const pool = new Pool({
  user: "postgres", // User name
  host: "localhost", // URL adress of localhost
  database: "postgres", // DB name
  password: "rootroot", // DB password
  port: 5432, // standart DB port
});

module.exports = pool;

pool
  .connect()
  .then((client) => {
    return client
      .query("SELECT NOW()") // простий запит до бази — поверне поточний час
      .then((res) => {
        console.log("Підключення до PostgreSQL успішне! Поточний час:", res.rows[0].now);
        client.release();
      })
      .catch((err) => {
        client.release();
        console.error("Помилка запиту:", err.stack);
      });
  })
  .catch((err) => console.error("Помилка підключення до PostgreSQL:", err.stack));
