var fs = require('fs');
var express = require('express');
var mongo = require('mongodb');

var app = express();

var db = new mongo.Db('nodejs-users', new mongo.Server("127.0.0.1", mongo.Connection.DEFAULT_PORT, {}))
var usersCollection;
db.open(function(error){
	console.log('Connected!');
	db.collection("users", function(error, collection){
		usersCollection = collection;
	});
});

app.get('/', function(req, res){
	var content = fs.readFileSync("index.html");
	
	getUsers(function(user){
		var ul = "";
		user.forEach(function(u){
			console.log(u.name);
			ul += "<li><strong>" + u.id +" "+ u.name + "</strong></li>";
		});
		content = content.toString("utf8").replace("{{INIT_TEXT}}", ul);
		
		res.setHeader("Content-Type","text/html");
		res.send(content);
	});
	
});

function getUsers(callback){
	usersCollection.find({}, {"limit":10, "sort":{"_id": 1}}, function(error, cursor){
		cursor.toArray(function(error, user){
			callback(user);
		});
	});
}

app.listen(3000);
