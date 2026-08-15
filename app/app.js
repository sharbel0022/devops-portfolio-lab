const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "nordicbyte",
    password: process.env.DB_PASSWORD || "nordicbyte_dev",
    database: process.env.DB_NAME || "nordicbyte"
});


app.locals.pool = pool;


app.get("/", (req, res) => {
    res.send("NordicByte DevOps Platform");
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.get("/db-health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            status: "healthy",
            database: "connected",
            time: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({
            status: "unhealthy",
            database: "disconnected"
        });
    }
});

app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, title, completed FROM tasks ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        const result = await pool.query(
            `INSERT INTO tasks (title, completed)
             VALUES ($1, FALSE)
             RETURNING id, title, completed`,
            [title]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            error: "Failed to create task"
        });
    }
});
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;