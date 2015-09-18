var assert = require('assert');
var express = require('express');
var expressLogger = require('express-logger');
var MongoClient = require('mongodb').MongoClient;
var _ = require('underscore');
var app = express();
app.use(expressLogger({ path: "express.log" }));
app.use(function(req,res,next) {
  res.header('X-UA-Compatible','IE=edge');
  next();
});
app.use(express.static("static"));

// Default values
var port = 8180;
var url = 'mongodb://localhost:27017/nevus';

app.get("/data.js", function(request, response) {
  var data = {};
  var database;
  var respond = function() {
    response.end("var data = " + JSON.stringify(data) + ";");
    database.close();
  };
  var fetched = _.after(2, respond);
  MongoClient.connect(url, function(err, db) {
    database = db;
    assert.equal(null,err);
    db.collection("filters", function(err, collection) {
      assert.equal(null,err);
      collection.find().toArray(function(err, items) {
        assert.equal(null,err);
        data.filters = items;
        fetched();
      });
    });
    db.collection("cases", function(err, collection) {
      assert.equal(null,err);
      collection.find().toArray(function(err, items) {
        assert.equal(null,err);
        data.cases = items;
        fetched();
      });
    })
  });
});

function parseArgs() {
	var usage = false;
	for (var index = 2; index < process.argv.length; index++) {
		switch (process.argv[index]) {
			case "-p":
				index++;
				port = process.argv[index];
				if (typeof port !== "number") usage = true;
        break;
			default:
				usage = true;
		}
		if (usage) break;
	}
	if (usage) {
		console.log("node server.js [-p <port>]");
		process.exit(1);
	}
}

parseArgs();
var server = app.listen(port, function() {});
