let db = null;

module.exports = {

  dbInit: function (dbo) {

    if (db === null) {
      db = dbo;
    }
  },

  test: function (dbo) {
      


    var myobj = { name: "Test Test", address: "Test" };
    db.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    });
    }
};