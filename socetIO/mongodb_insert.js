var mongo = require('mongodb');

var db = new mongo.Db('nodejs-users', new mongo.Server("127.0.0.1", mongo.Connection.DEFAULT_PORT, {}))

db.open(function(){
	console.log("Connected!");
	
	db.createCollection("users", function(err, collection){
		collection.insert({
			"id": "1",
			"name":"Darko",
			"email":"narancic.darko@gmail.com"
		});
		collection.insert({
			"id": "2",
			"name":"Mirko",
			"email":"mirkovic.mirko@gmail.com"
		});
	});
	
});
