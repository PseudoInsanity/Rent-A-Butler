"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const app = express();
const middleware = require("./middleware/index.js");
const mongo = require("./mongodb/mongo.js")

/* MongoDB */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'rent-a-butler';
const client = new MongoClient(url);
let db;

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    db = client.db(dbName);
    mongo.dbInit(db);
  });

  /* REST calls */
    app.get("/test", (req, res) => {


    mongo.test();
    res.send("OK");
  });


app.set("view engine", "ejs");
app.use(middleware.logIncomingToConsole);
app.listen(port, logStartUpDetailsToConsole);
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