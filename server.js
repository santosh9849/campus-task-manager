
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static("public"));

// Temporary task storage
let tasks = [];
let nextId = 1;


// API 1: GET all tasks
app.get("/api/tasks", (req, res) => {

    res.json(tasks);

});


// API 2: POST a new task
app.post("/api/tasks", (req, res) => {

    const { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            message: "Task name is required"
        });
    }

    const newTask = {
        id: nextId++,
        name: name.trim()
    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});


// API 3: DELETE a task
app.delete("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const exists = tasks.some(task => task.id === id);

    if (!exists) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message: "Task deleted successfully"
    });

});


// Start server
app.listen(5000, () => {

    console.log("Server running at http://localhost:5000");

});
