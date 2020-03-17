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

  addService: function (req) {

    var myObj = req.body;
    myObj.subscriber = "None";
    db.collection("services").insertOne(myObj, function(err, res) {
    if (err) {
      return JSON.stringify({succes: 0});
    }});
    return JSON.stringify({succes: 1});
  },

  getAllServices: function (res) {

    var result = [];
    var cursor = db.collection("services").find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      result.push(doc);
    }, function () {
      res.send(result);
    });
  },

  changeSubscriber: function (req) {

    var myquery = { _id: ObjectId(req.body.serviceId)};
    var newvalues = { $set: {subscriber: req.body.userId} };
    db.collection("services").updateOne(myquery, newvalues, function(err, res) {
      if (err) {
        return JSON.stringify({succes: 0});
      }});
      return JSON.stringify({succes: 1});
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