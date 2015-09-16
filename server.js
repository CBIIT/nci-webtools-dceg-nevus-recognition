var express = require('express');
var expressLogger = require('express-logger');
var app = express();

app.use(expressLogger({ path: "express.log" }));
app.use(express.static("static"));

// Default values
var port = 8210;

function parseArgs() {
	var usage = false;
	for (var index = 2; index < process.argv.length; index++) {
		switch (process.argv[index]) {
			case "-p":
				index++;
				port = process.argv[index];
				if (typeof value !== "number") break;
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
