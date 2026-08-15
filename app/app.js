const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const tasks = [
  {
    id: 1,
    title: "Learn Git",
    completed: true,
  },
  {
    id: 2,
    title: "Learn Docker",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.send("NordicByte DevOps Platform");
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
