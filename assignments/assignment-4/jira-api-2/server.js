import express from "express";
import { v4 as uuid, validate } from "uuid";
import { stories } from "./data.js";

const app = express();
app.use(express.json());
const PORT = 3030;

// Get all stories
app.get("/stories", (req, res) => {
    res.status(200).json({
        data: stories
    });
});

// Create a new story
app.post("/stories", (req, res) => {
    const data = req.body;
    const id = uuid();
    const story = { ...data, id };
    stories[id] = { ...story };

    res.status(200).json({
        data: story
    });
});

// Get a story by id
app.get("/stories/:storyId", (req, res) => {
    const storyId = req.params.storyId;

    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }

    res.status(200).json({ data: stories[storyId] });
});

// Update a story status
app.put("/stories/:storyId", (req, res) => {
    const storyId = req.params.storyId;
    const updatedData = req.body;

    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }

    stories[storyId] = { ...stories[storyId], ...updatedData };

    res.status(200).json({ data: stories[storyId] });
});

// Delete a story by id
app.delete("/stories/:storyId", (req, res) => {
    const storyId = req.params.storyId;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    delete stories[storyId];
    res.status(204).send();
});

// Get all subtasks of a stories
app.get("/stories/:storyId/tasks", (req, res) => {
    const storyId = req.params.storyId;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    res.status(200).json({ data: stories[storyId].tasks });
});

// Create a new subtask for a story
app.post("/stories/:storyId/tasks", (req, res) => {
    const storyId = req.params.storyId;
    const taskData = req.body;
    const id = uuid();
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    const newTask = {
        ...taskData,
        id
    };
    stories[storyId].tasks[id] = { ...newTask };
    res.status(201).json({ data: newTask });
});

// Get a single subtask of a story
app.get("/stories/:storyId/tasks/:taskId", (req, res) => {
    const { storyId, taskId } = req.params;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    const task = Object.values(stories[storyId].tasks).find(
        (t) => t.id === taskId
    );
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ data: task });
});

// Update a single task of a story
app.put("/stories/:storyId/tasks/:taskId", (req, res) => {
    const { storyId, taskId } = req.params;
    const updatedData = req.body;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    stories[storyId].tasks[taskId] = {
        ...stories[storyId].tasks[taskId],
        ...updatedData
    };
    res.status(200).json({ data: stories[storyId].tasks[taskId] });
});

// Delete a single task of a story
app.delete("/stories/:storyId/tasks/:taskId", (req, res) => {
    const { storyId, taskId } = req.params;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }

    delete stories[storyId].tasks[taskId];
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
