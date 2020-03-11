"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const app = express();
const routeLotto = require("./route/lotto.js");
const middleware = require("./middleware/index.js");

app.set("view engine", "ejs");

app.use(middleware.logIncomingToConsole);
app.use("/lotto", routeLotto);
app.use(express.static(__dirname + "/public"));
app.listen(port, logStartUpDetailsToConsole);

app.get("/report", (req, res) => {
    res.sendFile(__dirname + "/public/report/me.html");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/node/index.html");
});

function logStartUpDetailsToConsole () {
    let routes = [];

    app._router.stack.forEach(middleware => {
        if (middleware.route) {
            routes.push(middleware.route);

        } else if (middleware.name ==="router") {

            middleware.handle.stack.forEach((handler) => {

                let route;
                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);

    console.info("Available routes are:");
    console.info(routes);
}