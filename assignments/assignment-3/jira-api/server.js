const http = require("http");
const { v4: uuid, validate } = require("uuid");

const port = 3000;
const host = "localhost";

const newStoryId = uuid();
const newTaskId = uuid();

const stories = {
    // "uuid-story-1": {
    //     id: "uuid-story-1",
    //     name: "Story 1",
    //     description: "Description for Story 1",
    //     status: "Todo", // "Todo", "InProgress", "InQA", "Done"
    //     tasks: {
    //         "uuid-task-1": {
    //             id: "uuid-task-1",
    //             name: "Sub-task 1",
    //             description: "Description for Sub-task 1",
    //             status: "Todo" // "Todo", "InProgress", "Done"
    //         },
    //         "uuid-task-2": {
    //             id: "uuid-task-2",
    //             name: "Sub-task 2",
    //             description: "Description for Sub-task 2",
    //             status: "InProgress" // "Todo", "InProgress", "Done"
    //         }
    //     }
    // },
    // "uuid-story-2": {
    //     id: "uuid-story-2",
    //     name: "Story 2",
    //     description: "Description for Story 2",
    //     status: "InProgress", // "Todo", "InProgress", "InQA", "Done"
    //     tasks: {
    //         "uuid-task-3": {
    //             id: "uuid-task-3",
    //             name: "Sub-task 3",
    //             description: "Description for Sub-task 3",
    //             status: "Done" // "Todo", "InProgress", "Done"
    //         }
    //     }
    // }
};

const parseId = (path, level) => {
    const parts = path.split("/");
    return parts[level];
};

const verifyPathMatchStories = (path, pattern) => {
    const parts = path.split("/");
    return (
        parts.length === pattern && parts[1] === "stories" && validate(parts[2])
    );
};

const verifyPathMatchTasks = (path, pattern) => {
    const parts = path.split("/");
    return (
        parts.length === pattern &&
        parts[1] === "stories" &&
        parts[2] === "tasks" &&
        validate(parts[3])
    );
};

// Implement CRUD for Stories

const getAllStories = (res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(stories));
};

const createStory = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const newStory = {
            id: newStoryId,
            name: body.name,
            description: body.description,
            status: body.status,
            tasks: {}
        };
        stories[newStoryId] = newStory;

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(newStory));
    });
};

const getStory = (req, res) => {
    const id = parseId(req.url, 2);
    const story = stories[id];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(story));
};

const updateStoryStatus = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const id = parseId(req.url, 2);

        stories[id].status = body.status;

        res.statusCode = 204;
        res.end();
    });
};

const deleteStory = (req, res) => {
    const id = parseId(req.url, 2);
    delete stories[id];
    res.statusCode = 200;
    res.end();
};

// Implement CRUD for Subtasks

const getAllSubtasks = (res) => {
    const allSubTasks = {};

    for (const stroryId in stories) {
        const story = stories[id];
        const subTasks = story.tasks;

        for (const taskId in subTasks) {
            const task = subTasks[taskId];

            allSubTasks[newStoryId] = task;
        }
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allSubTasks));
};

const createSubtask = (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];

        const subTasks = story.tasks;

        let body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            body = JSON.parse(Buffer.concat(body));
            const newSubTask = {
                id: newTaskId,
                name: body.name,
                description: body.description,
                status: body.status
            };
            subTasks[newTaskId] = newSubTask;

            res.writeHead(201, { "content-type": "application/json" });
            res.end(JSON.stringify(newSubTask));
        });
    }
};

const updateSubtaskStatus = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));

        for (const storyId in stories) {
            const story = stories[storyId];
            const subTasks = story.tasks;

            const id = parseId(req.url, 3);

            if (subTasks[id]) {
                subTasks[id].status = body.status;
            }
        }
        res.statusCode = 204;
        res.end();
    });
};

const getSubtask = (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const subTasks = story.tasks;

        const id = parseId(req.url, 3);

        const subtask = subTasks[id];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(subtask));
    }
};

const deleteSubtask = (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const subTasks = story.tasks;

        const id = parseId(req.url, 3);

        delete subTasks[id];
        res.statusCode = 200;
        res.end();
    }
};

const server = http.createServer((req, res) => {
    const isPathMatchStories = verifyPathMatchStories(req.url, 3);
    const isPathMatchTasks = verifyPathMatchTasks(req.url, 4);

    // Routing for Stories
    if (req.url === "/stories" && req.method === "GET") {
        getAllStories(res);
    } else if (req.url === "/stories" && req.method === "POST") {
        createStory(req, res);
    } else if (isPathMatchStories && req.method === "GET") {
        getStory(req, res);
    } else if (isPathMatchStories && req.method === "PATCH") {
        updateStoryStatus(req, res);
    } else if (isPathMatchStories && req.method === "DELETE") {
        deleteStory(req, res);
    }

    // Routing for Subtasks
    else if (isPathMatchTasks && req.method === "GET") {
        getAllSubtasks(req, res);
    } else if (isPathMatchTasks && req.method === "POST") {
        createSubtask(req, res);
    } else if (isPathMatchTasks && req.method === "GET") {
        getSubtask(req, res);
    } else if (isPathMatchTasks && req.method === "PATCH") {
        updateSubtaskStatus(req, res);
    } else if (isPathMatchTasks && req.method === "DELETE") {
        deleteSubtask(req, res);
    }

    // If none of the endpoints match
    else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Wrong Address");
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
