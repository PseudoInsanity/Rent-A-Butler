let db = null;
let assert = null;
let ObjectId = null;

function callback (res) {

  result = res;
};

module.exports = {

  dbInit: function (dbo, ass, obi) {

    if (db === null) {
      db = dbo;
      assert = ass;
      ObjectId = obi;
    }
  },

  test: function () {

    var myobj = { name: "Test Test", address: "Test" };
    db.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    });
  },

  addService: function (req, res) {

    var myObj = req.body;
    myObj.subscriber = "None";
    db.collection("services").insertOne(myObj, function(err, item) {
      if (err) {
        res.send({succes: 0});
      } else if (item){
        res.send({succes: 1});
      }});
  },

  getAllServices: function (res) {

    var result = [];
    var cursor = db.collection("services").find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      if (doc.subscriber === "None") {
        result.push(doc);
      }
    }, function () {
      res.send(result);
    });
  },

  changeSubscriber: function (req, res) {

    var myquery = { _id: ObjectId(req.body.serviceId)};
    var newvalues = { $set: {subscriber: req.body.userId} };
    db.collection("services").updateOne(myquery, newvalues, function(err, item) {
      if (err || !item.result.nModified) {
        res.send({succes: 0});
      } else if (item.result.nModified){
        res.send({succes: 1});
      }});
  },

  getUserSubscriptions: function (req, res) {

    var result = [];
    var cursor = db.collection("services").find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      if (doc.subscriber === req) {
        result.push(doc);
      }
    }, function () {
      if (result.length > 0) {

        res.send(result);

      } else {

        res.send({success: 0});
      }
    });
  },

  createUser: function (req) {
    var newUser = req.body;
    var structeredUser = { firstName: newUser.firstName, lastName: newUser.lastName, userName: newUser.userName, password: newUser.password};
    console.log(structeredUser)

    db.collection("users").insertOne(structeredUser, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted(req json)");
        });
  },

  login: function (req) {
    var userAuth = req.body;
 
  }
};