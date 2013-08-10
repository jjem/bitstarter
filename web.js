var express = require('express');
var fs = require('fs');
var auth = require('http-auth');
var app = express.createServer(express.logger());

var basic = auth({
    authRealm : "Private area.",
    // username is mia, password is supergirl.
    authList : ['jjem:{SHA}UpDB29AH3oPEm+S/nQEB3i1N17Q=']
});

var protect = process.env.PROTECT || false;
var port = process.env.PORT || 8080;

app.get('/', function(request, response) {
    var msg = fs.readFileSync('index.html').toString();
    if(protect){
	basic.apply(request,response, function (username){
	    response.send(msg);
	});
    }
    else{
	response.send(msg);
    }
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
