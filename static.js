/********** 
Works waaaaay better
**************/
var http = require('http');
var fs = require('fs');
var url = require('url');
module.exports = function (request, response) {
	var type = request.slice(request.indexOf('.') + 1, request.length);
	if(type == 'html') {
		path = 'views' + request;
		charset = 'utf8';
		dataType = 'text/html'; 
	} else if(type == 'css') {
		path = request.slice(1, request.length);
		charset = 'utf8';
		dataType  = 'text/css'; 
	} else {
		path = request.slice(1, request.length);
		charset = null;
		dataType = 'image/' + type;
	}
	fs.readFile(path, charset, function (errors, contents) {
			response.writeHead(200, {'content-Type': dataType });
			response.write(contents);
			response.end();
		})
}