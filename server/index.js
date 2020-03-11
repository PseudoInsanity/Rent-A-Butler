"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const app = express();
const middleware = require("./middleware/index.js");

/* MongoDB */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017,localhost:27018/?replicaSet=foo';
const dbName = 'rent-a-butler';
const client = new MongoClient(url);

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    const db = client.db(dbName);
  
    client.close();
  });

  /* Mongo End */

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