var https = require('https');
var express = require('express');

var app = express();

var options = {
	host: "stream.twitter.com",
	port: 443,
	path: "/1.1/statuses/filter.json?track=twitter",
	method: "GET",
	headers: {
		"Authorization":"Basic " + new Buffer("Darko_Narancic:darko_87").toString("base64")
	}
};
console.log(https);
var request = https.request(options, function(res){
	console.log("In");
	res.on('data', function(chunk){
		console.log("Working");
		var tweet = JSON.parse(chunk);
	})
	res.on('end',function(){
		console.log("End!");
	});
});

app.listen(3000);