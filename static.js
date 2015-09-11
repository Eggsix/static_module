/********** 
WARNING! 
Takes forever to load but does load 
**************/
var http = require('http');
var fs = require('fs');
var url = require('url');
module.exports = function (request, response) {

	var files = fs.readdirSync('./views').concat(fs.readdirSync('./stylesheets'), fs.readdirSync('./images')),
		route,
		path,
		charset,
		type,
		parse = [];
		for(var file = 0; file < files.length; file++) {
			 if(files[file] != '.DS_Store') {
			 	var type = files[file].slice(files[file].indexOf('.') + 1, files[file].length);
			 	var key = files[file].slice(0, files[file].indexOf('.'));
			 	parse.push([key, type]);
			 }
		}
		function findFile(array, request) {
			if(request == null) {
				return false;
			}
			for(var find = 0; find < array.length; find++)
			{
				if(request == '/' + array[find][0]) {
					return array[find];
				}
				else if(request == '/stylesheets/' + array[find][0] + '.' + array[find][1]) {
					return array[find];
				}
				else if(request == '/images/' + array[find][0] + '.' + array[find][1]) {
					return array[find];
				}
			}
		}
		var value = findFile(parse, request.url);
		if(value[1] == 'html') {
			route = '/' + value[0];
			path = 'views/' + value[0] + '.' + value[1];
			charset = 'utf8';
			dataType = 'text/html'
		}
		else if (value[1] == 'css') {
			route = '/' + value[0];
			path = '/stylesheets/' + value[0] + '.' + value[1];
			charset = 'utf8';
			dataType = 'text/css';
		}
		else 
		{
			route = '/' + value[0];
			path = '/images/' + value[0] + '.' + value[1];
			charset = null;
			dataType = 'image/' + value[1];
		}

		fs.readFile(path, charset, function (errors, contents) {
			response.writeHead(200, {'content-Type': type });
			response.write(contents);
			response.end();
		})


}

