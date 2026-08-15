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

const tasks = [
    {
        id: 1,
        title: "Learn Git",
        completed: true
    },
    {
        id: 2,
        title: "Learn Docker",
        completed: false
    }
];

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

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;