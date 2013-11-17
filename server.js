var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
	exec = require('child_process').exec,
	imageinfo = require('imageinfo');

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

var tiles = [
	[
		{img: 'img/grass.png'},
		{img: 'img/mountains.png'},
		{img: 'img/cave-20.png'},
		{img: 'img/cave-21.png'},
		{img: 'img/cave-22.png'}
	]
];

var world = null;

app.get('/tiles', function(req, res) {
	res.send(tiles);
});

app.post('/world', function(req, res) {
	world = req.body;
	res.send('success');
});

app.get('/world', function(req, res) {
	res.send(world);
});

var splitImage = function(path) {
	var cmd = 'convert ' + path + ' -crop 16x16 -filter Point -resize x32 +antialias ' + path;
	exec(cmd, function(err, stdout, stderr) {
		if (err) {
			if (err.message.indexOf('Invalid Parameter') !== -1) {
				throw 'Must install imagemagick';
			}
			//console.log(err.message);
			//throw err;
		}
		console.log('cropped');
	});
};

var getRelativePath = function(path) {
	var pieces = path.split('\\');
	var relativePath = pieces[pieces.length-2] + '\\' + pieces[pieces.length-1];
	return relativePath;
};

var saveFile = function(req, callback) {
	var tempPath = req.files.file.path,
		targetPath = path.resolve('./uploads/' + req.body.fileName + '.png');

	// if (path.extname(req.files.file.name).toLowerCase() === '.png') {
	//console.log(req.files.file)
	if (req.files.file.headers['content-type'] === 'image/png') {
		fs.rename(tempPath, targetPath, function(err) {
			if (err) throw err;
			console.log("Upload completed!");
			var relativePath = getRelativePath(targetPath);
			console.log(relativePath);
			splitImage(relativePath);
			callback();
		});
	} else {
		fs.unlink(tempPath, function (err) {
			if (err) throw err;
			console.error("Only .png files are allowed!");
			callback();
		});
	}
};

var isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

app.post('/upload', function (req, res) {
	setTimeout(
		function () {
			res.setHeader('Content-Type', 'text/html');
			//console.log(req.files);
			if (req.files.length === 0 || req.files.file.size === 0) {
				res.send({ msg: 'No file uploaded at ' + new Date().toString() });
			} else {
				var file = req.files.file;
				saveFile(req, function() {
					res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });
				});
			}
		},
		(req.param('delay', 'yes') == 'yes') ? 2000 : -1
	);
});

app.get('/stat', function (req, res) {
	fs.readdir('./uploads', function(err, files) {
		var images = [];

		for (var i = 0; i < files.length; i++) {
			if (files[i].split('.').pop() === 'png') {
				images.push(files[i]);
			}
		}
		
		console.log(images.length);

		var tiles = [];
		for (var i = 0; i < images.length; i++) {
			if (images[i])
		}

		/*fs.readFile('./uploads/cave.png', function (err, data) {
			if (err) throw err;
			info = imageinfo(data);
			console.log("Data is type:", info.mimeType);
			console.log("  Size:", data.length, "bytes");
			var tilesPerRow = info.width / 16;
			console.log("There are", tilesPerRow, "tiles per row");
		});*/

		/*
		angular.module('Helpers', [])

		.factory('forEach', [function() {
		    return {
		        do: function(set, callback) {
		            for (var i = 0; i < set.length; i++) {
		                var item = set[i];
		                callback(item);
		            }
		        },

		        select: function(set, callback, options) {
		            var processed = [];
		            if (set === null || set === undefined) {
		                return null;
		            }

		            for (var i = 0; i < set.length; i++) {
		                var item = set[i];
		                var result = callback(item, processed);
		                if (result !== null && result !== undefined) {
		                    if (options && options.unique === true) {
		                        if (processed.indexOf(result) === -1) {
		                            processed.push(result);
		                        }
		                    } else {
		                        processed.push(result);
		                    }
		                }
		            }

		            if (processed.length === 0) {
		                if (options && options.returnEmpty) {
		                    return [];
		                } else {
		                    return null;
		                }
		            } else if (processed.length === 1) {
		                if (options && options.forceArray) {
		                    return processed;
		                } else {
		                    return processed[0];
		                }
		            } else {
		                return processed;
		            }
		        },

		        obj: {
		            do: function(set, callback) {
		                for (var field in set) {
		                    if (set.hasOwnProperty(field)) {
		                        var item = set[field];
		                        callback(item);
		                    }
		                }
		            },

		            select: function(set, callback) {
		                var processed = [];

		                for (var field in set) {
		                    if (set.hasOwnProperty(field)) {
		                        var item = set[field];
		                        processed.push(callback(item));
		                    }
		                }

		                return processed;
		            }
		        }
		    };
		}])

		.factory('sortFactory', [function() {
		    return function(propertyNames) {
		        if (propertyNames.length === 1) {
		            var prop = propertyNames[0];

		            return function(a, b) {
		                if (typeof a[prop] === 'string') {
		                    return (a[prop].localeCompare(b[prop]));
		                } else {
		                    return a[prop] - b[prop];
		                }
		            };
		        } else if (propertyNames.length === 2) {
		            var prop1 = propertyNames[0];
		            var prop2 = propertyNames[1];

		            return function(a, b) {
		                if (a[prop1] != b[prop1]) {
		                    return (a[prop1] - b[prop1]);
		                } else {
		                    return (a[prop2].localeCompare(b[prop2]));
		                }
		            };
		        }
		        return function(a, b) {
		            return 1;
		        };
		    };
		}]);
		*/
	});
});

app.get('/read', function (req, res) {
	fs.readFile('./uploads/cave.png', function (err, data) {
		if (err) throw err;
		info = imageinfo(data);
		/*console.log("Data is type:", info.mimeType);
		console.log("  Size:", data.length, "bytes");*/
		var tilesPerRow = info.width / 16;
		console.log("There are", tilesPerRow, "tiles per row");
	});
});

app.listen(9999);
console.log('listening on port 9999...');