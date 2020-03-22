let db = null;
let assert = null;
let ObjectId = null;

function callback(res) {

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

  addService: function (req, res) {

    var myObj = req.body;
    db.collection("services").insertOne(myObj, function (err, item) {
      if (err) {
        res.send({ success: 0 });
      } else if (item) {
        res.send({ success: 1 });
      }
    });
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

  getUsers: function (res) {
    var result = [];
    var cursor = db.collection("users").find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      result.push(doc);
    }, function () {
      res.send(result);
      console.log(result);
    });
  },

  addSubscription: function (req, res) {

    var serId = req.body.serviceId.toString();
    var myquery = { _id: ObjectId(req.body.userId) };
    var newvalues = { $push: { subscriptions: serId } };
    db.collection("users").updateOne(myquery, newvalues, function (err, item) {
      if (err) {res.send({success:0});} else {
        res.send({success:1});
      }
    });
  },

  removeSubscription: function(req, res) {

    var serId = req.params.serviceId.toString();
    var myquery = { _id: ObjectId(req.params.userId) };
    var newvalues = { $pull: { subscriptions: serId } };
    db.collection("users").updateOne(myquery, newvalues, function (err, item) {
      if (err) {res.send({success:0});} else {
        res.send({success:1});
      }
    });
  },

  getUserSubscriptions: function (req, res) {

    var result = [];
    db.collection("users").find({_id: ObjectId(req)}).toArray(function (err, user) {
      if (err) throw err;
      res.send(user[0].subscriptions);
    });
  },

  createUser: function (req, res) {
    var newUser = req.body;
    var structeredUser = { firstName: newUser.firstName, lastName: newUser.lastName, userName: newUser.userName, password: newUser.password, subscriptions: [] };

    db.collection("users").insertOne(structeredUser, function (err, item) {
      if (err) {
        res.send({ success: 0 });
      } else if (item) {
        res.send({ success: 1 });
      }
    });
  },

  login: function (req, res) {
    var userAuth = req.body;
  
    var credentialMatch = false;
    var response = [];
    var cursor = db.collection('users').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      if (doc.userName === userAuth.userName && doc.password === userAuth.password) {
        credentialMatch = true;
        response.push(doc);
      }
    }, function () {
      if (credentialMatch) {
        response.push({ success: 1 });
        res.send(response);

      } else {

        res.send({success: 0});
      }
    });
  }
};