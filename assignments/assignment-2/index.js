const fs = require("fs");
const http = require("http");
const { data } = require("./data");
console.log(data);

const host = "localhost";
const port = 3000;

const handleErrors = (res, message = "Something went wrong from our side") => {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(message);
};

const server = http.createServer((req, res) => {
    if (req.url === "/styles.css") {
        fs.readFile("styles.css", "utf-8", (err, css) => {
            if (err) {
                handleErrors(res);
            }
            res.setHeader("Content-Type", "text/css");
            res.end(css);
        });
    } else if (req.url === "/") {
        fs.readFile("templates/index.html", "utf-8", (err, document) => {
            if (err) {
                handleErrors(res);
            }
            const users = [];

            fs.readFile("templates/user.html", "utf-8", (err, user) => {
                if (err) {
                    handleErrors(res);
                }

                for (const id in data) {
                    const person = data[id];
                    let dynamicUser = user;
                    dynamicUser = dynamicUser.replace("{name}", person.name);
                    dynamicUser = dynamicUser.replace(
                        "{profession}",
                        person.profession
                    );
                    dynamicUser = dynamicUser.replace("{about}", person.about);
                    dynamicUser = dynamicUser.replace(
                        "{imgUrl}",
                        person.avatar
                    );
                    const finalUser = `<a href=${id}>${dynamicUser}</a>`;
                    users.push(finalUser);
                }

                const concattedUsers = users.join("");
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(document.replace("{content}", concattedUsers));
            });
        });
    } else if (Number(req.url.slice(1)) <= 10) {
        fs.readFile("templates/index.html", "utf-8", (err, document) => {
            if (err) {
                handleErrors(res);
            }

            fs.readFile("templates/user.html", "utf-8", (err, user) => {
                if (err) {
                    handleErrors(res);
                }

                const person = data[req.url.slice(1)];
                let dynamicUser = user;
                dynamicUser = dynamicUser.replace("{name}", person.name);
                dynamicUser = dynamicUser.replace(
                    "{profession}",
                    person.profession
                );
                dynamicUser = dynamicUser.replace("{about}", person.about);
                dynamicUser = dynamicUser.replace("{imgUrl}", person.avatar);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(document.replace("{content}", dynamicUser));
            });
        });
    } else {
        handleErrors(res, "Wrong address");
    }
});

server.listen(port, host, () => {
    console.log("I am running on", port, host);
});
