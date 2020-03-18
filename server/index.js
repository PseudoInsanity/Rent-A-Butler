"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const middleware = require("./middleware/index.js");
const mongo = require("./mongodb/mongo.js");
var jsonParser = bodyParser.json()

/* MongoDB */
const {MongoClient, ObjectId } = require('mongodb');
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'rent-a-butler';
const client = new MongoClient(url);
let db;

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    db = client.db(dbName);
    mongo.dbInit(db, assert, ObjectId);
});

  /* REST calls */

app.post("/service", jsonParser, (req, res) => {

    mongo.addService(req, res);
});

app.get("/service", jsonParser, (req, res) => {

    mongo.getAllServices(res);
});

app.put("/service", jsonParser, (req, res) => {

    mongo.changeSubscriber(req, res);
});

app.get("/service/:userId", (req, res) => {

    mongo.getUserSubscriptions(req.params.userId, res);
});

app.post("/createUser", jsonParser, (req, res) => {
    mongo.createUser(req, res);
});

app.post("/login", jsonParser, (req, res) => {
mongo.login(req, res);
console.log(mongo);
});


app.set("view engine", "ejs");
app.use((req, res, next,) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
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