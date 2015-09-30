if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}
var assert = require('assert');
var bodyParser = require('body-parser');
var express = require('express');
var expressLogger = require('express-logger');
var fs = require('fs');
var gm = require('gm');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');
var app = express();

app.use(expressLogger({ path: "express.log" }));
app.use(function(req,res,next) {
  res.header('X-UA-Compatible','IE=edge');
  next();
});
app.use(bodyParser.json());
app.use(express.static("static"));

// Default values
var port = 8180;
var mongohost = 'localhost';
var mongoport = 27017;
var databasename = 'nevus';

app.get("/data.js", function(request, response) {
  var data = {};
  var database;
  var respond = function() {
    response.end("var data = " + JSON.stringify(data) + ";");
    database.close();
  };
  var fetched = _.after(2, respond);
  MongoClient.connect('mongodb://'+mongohost+':'+mongoport+'/'+databasename, function(err, db) {
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
      collection.find({$query:{},$orderby:{order:1}}).toArray(function(err, items) {
        assert.equal(null,err);
        data.cases = items;
        fetched();
      });
    })
  });
});

app.route("/admin/image").all(function(request, response, next) {
  next();
}).post(upload.single('image'), function(request, response) {
  var extension;
  switch(request.file.mimetype) {
    case 'image/jpeg':
      extension = '.jpg';
      break;
    default:
      if (request.file.mimetype.startsWith('image/')) {
        extension = '.'+request.file.mimetype.substring(6);
      } else {
        return uploadError("Invalid File Type",request.file.path,response);
      }
  }
  var filename = '/images/uploads/'+request.file.filename;
  var thumbnail = filename+'-thumb'+extension;
  filename += extension;
  fs.rename(request.file.path,request.file.path+extension,function() {
    gm(request.file.path+extension).resize(428,275,"^").crop(428,275,0,0).write("static"+filename,function(error) {
      if (error) { return uploadError(JSON.stringify(error),request.file.path+extension,response); }
      gm("static"+filename).resize(100,67,"^").crop(100,67,0,0).write("static"+thumbnail,function(error) {
        if (error) { return uploadError(JSON.stringify(error),request.file.path+extension,response); }
        fs.unlink(request.file.path+extension);
        response.end("{ \"image\": \""+filename+"\", \"thumbnail\": \""+thumbnail+"\" }");
      });
    });
  });
});

app.route("/admin/cases").put(function(request,response) {
  MongoClient.connect('mongodb://'+mongohost+':'+mongoport+'/'+databasename, function(err, db) {
    database = db;
    assert.equal(null,err);
    db.collection("cases", function(err, collection) {
      assert.equal(null,err);
      for (var index in request.body) {
        var item = request.body[index];
        var _id = new ObjectID(item._id);
        delete item._id;
        delete item['$$hashKey'];
        for (var imageIndex in item.images) {
          delete item.images[imageIndex]['$$hashKey'];
        }
        collection.update({
          "_id": _id
        }, item, {
          "upsert": true
        },function(err, result) {
          assert.equal(null,err);
        });
      }
    });
  });  
  response.end("{}");
}).delete(function(request,response) {
  MongoClient.connect('mongodb://'+mongohost+':'+mongoport+'/'+databasename, function(err, db) {
    database = db;
    assert.equal(null,err);
    db.collection("cases", function(err, collection) {
      assert.equal(null,err);
      collection.remove({ "_id": new ObjectID(request.body._id) });
    });
  });
});

function isNumeric(maybe) { return !isNaN(parseFloat(maybe)) && isFinite(maybe); }

function uploadError(errorMsg,filePath,response) {
  response.end("{ \"error\": \""+errorMsg+"\" }");
  fs.unlink(filePath);
  return;
}

function parseArgs() {
	var usage = false;
	for (var index = 2; index < process.argv.length; index++) {
		switch (process.argv[index]) {
			case "-p":
				index++;
				port = process.argv[index];
				if (!isNumeric(port)) usage = true;
        break;
      case "-mh":
        index++;
        mongohost = process.argv[index];
        break;
      case "-mp":
        index++;
        mongoport = process.argv[index];
        if (!isNumeric(mongoport)) usage = true;
        break;
      case "-d":
        index++;
        database = process.argv[index];
        break;
			default:
				usage = true;
		}
		if (usage) break;
	}
	if (usage) {
		console.log("node server.js [-p <port>] [-mh <mongo hostname>] [-mp <mongo port>] [-d <database name>]");
		process.exit(1);
	}
}

parseArgs();
var server = app.listen(port, function() {});
