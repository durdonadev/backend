const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
    console.log(request.url);

    if (request.url === "/styles.css") {
        fs.readFile("styles.css", "utf-8", (err, css) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Something went wrong from our side");
            }
            response.setHeader("Content-Type", "text/css");
            response.end(css);
        });
    } else if (request.url === "/") {
        fs.readFile("index.html", "utf-8", (err, data) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Something went wrong from our side");
            }
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        });
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("404. You have a wrong adress!");
    }
});

server.listen(port, host, () => {
    console.log(`I am listening to ${host}, ${port}`);
});
