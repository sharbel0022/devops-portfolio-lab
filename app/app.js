const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("NordicByte DevOps Platform");
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});