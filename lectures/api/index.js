const http = require("http");
const { v4: uuid, validate } = require("uuid");

const todos = {
    // 1: { id: 1, task: "Some text", status: "Todo" }
};

console.log(todos);
const port = 4000;
const host = "localhost";

const parseId = (path) => {
    const parts = path.split("/");
    return parts[2];
};

const verifyPathMatch = (path) => {
    const parts = path.split("/");
    return parts.length === 3 && parts[1] === "todos" && validate(parts[2]);
};

const getAllTodos = (res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
};

const createTodo = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const newId = uuid();
        const newTodo = {
            id: newId,
            task: body.task,
            status: body.status
        };
        todos[newId] = newTodo;

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(newTodo));
    });
};

const updateTodoStatus = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const id = parseId(req.url);

        todos[id].status = body.status;

        res.statusCode = 204;
        res.end();
    });
};

const getTodo = (req, res) => {
    const id = parseId(req.url);
    const todo = todos[id];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
};

const deleteTodo = (req, res) => {
    const id = parseId(req.url);
    delete todos[id];
    res.statusCode = 200;
    res.end();
};

const server = http.createServer((req, res) => {
    const isPathMatch = verifyPathMatch(req.url);
    if (req.url === "/todos" && req.method === "GET") {
        getAllTodos(res);
    } else if (req.url === "/todos" && req.method === "POST") {
        createTodo(req, res);
    } else if (isPathMatch && req.method === "PATCH") {
        updateTodoStatus(req, res);
    } else if (isPathMatch && req.method === "GET") {
        getTodo(req, res);
    } else if (isPathMatch && req.method === "DELETE") {
        deleteTodo(req, res);
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Wrong Address");
    }
});

// const server = http.createServer((req, res) => {
//     if (req.url === "/todos" && req.method === "GET") {
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(todos));
//     } else if (req.url === "/todos" && req.method === "POST") {
//         let body = [];
//         req.on("data", (chunk) => {
//             body.push(chunk);
//         });
//         req.on("end", () => {
//             body = JSON.parse(Buffer.concat(body));
//             const newId = uuid();
//             const newTodo = {
//                 id: newId,
//                 task: body.task,
//                 status: body.status
//             };
//             todos[newId] = newTodo;

//             res.writeHead(201, { "content-type": "application/json" });
//             res.end(JSON.stringify(newTodo));
//         });
//     } else if (req.url.split("/").length === 3 && req.method === "PATCH") {
//         let body = [];
//         req.on("data", (chunk) => {
//             body.push(chunk);
//         });
//         req.on("end", () => {
//             body = JSON.parse(Buffer.concat(body));
//             const id = parseId(req.url);

//             todos[id].status = body.status;

//             res.statusCode = 204;
//             res.end();
//         });
//     } else if (req.url.split("/").length === 3 && req.method === "GET") {
//         const id = parseId(req.url);
//         const todo = todos[id];

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(todo));
//     } else if (req.url.split("/").length === 3 && req.method === "DELETE") {
//         const id = parseId(req.url);
//         delete todos[id];
//         res.statusCode = 200;
//         res.end();
//     }
// });

server.listen(port, host, () => {
    console.log("I am running on", port, host);
});
