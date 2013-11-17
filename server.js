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
	getSprites('./public/img/cave', 'png', function (tiles) {
		res.send(tiles);
	});
});

app.post('/world', function(req, res) {
	world = req.body;
	res.send('success');
});

app.get('/world', function(req, res) {
	res.send(world);
});

Array.prototype.forEach = function(callback){
	for (var i = 0; i < this.length; i++) {
		callback(this[i], i);
	}
};

Array.prototype.select = function(callback, options){
	var results = [];

	for (var i = 0; i < this.length; i++) {
		var result = callback(this[i], i);

		if (result !== null && result !== undefined) {
			if (!options || !options.unique || results.indexOf(result) === -1) {
				results.push(result);
			}
		}
	}

	if (results.length === 0 && (!options || !options.returnEmpty)) {
		results = null;
	} else if (results.length === 1 && (!options || !options.forceArray)) {
		results = results[0];
	}

	return results;
};

Array.prototype.where = function(callback){
	var results = [];

	for (var i = 0; i < this.length; i++) {
		if (callback(this[i])) {
			results.push(this[i]);
		}
	}

	return results;
};

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

var getSprites = function(directory, type, callback) {
	fs.readdir(directory, function(err, files) {
		var images = files.select(function(file) {
			return file.split('.').pop() === type;
		});

		var tiles = images.sort(function (a, b) {
			var aNum = parseInt(a.split('-').pop().split('.')[0]);
			var bNum = parseInt(b.split('-').pop().split('.')[0]);
			return bNum - aNum;
		});

		var source = tiles.pop();
		var folder = directory.split('/').pop();

		tiles = tiles.reverse().select(function (tile) {
			return {img: 'img/' + folder + '/' + tile};
		});

		fs.readFile(directory + '/' + source, function (err, data) {
			if (err) throw err;
			info = imageinfo(data);
			/*console.log("Data is type:", info.mimeType);
			console.log("  Size:", data.length, "bytes");*/
			var tilesPerRow = info.width / 16;
			var arrangedTiles = [];
			tiles.forEach(function(tile, i) {
				var row = Math.floor(i / tilesPerRow);
				var column = i - row * tilesPerRow;
				if (column === 0) {
					arrangedTiles[row] = [];
				}
				arrangedTiles[row].push(tile);
			});

			callback(arrangedTiles);
		});
	});
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

app.get('/tilesets', function (req, res) {
	fs.readdir('./public/img', function (err, files) {
		var folders = files.select(function (file) {
			if (file.split('.').length === 1) {
				return {
					img: 'img/' + file + '/' + file + '.png',
					name: file
				};
			}
		});



		/*var walk = function(dir, done) {
			var results = [];
			fs.readdir(dir, function(err, list) {
				if (err) return done(err);
				var pending = list.length;
				if (!pending) return done(null, results);
				list.forEach(function(file) {
					file = dir + '/' + file;
					fs.stat(file, function(err, stat) {
						if (stat && stat.isDirectory()) {
							walk(file, function(err, res) {
							results = results.concat(res);
							if (!--pending) done(null, results);
							});
						} else {
							results.push(file);
							if (!--pending) done(null, results);
						}
					});
				});
			});
		};
*/
		res.send(folders);
	});
});

app.get('/stat', function (req, res) {
	getSprites('./uploads', 'png', function (tiles) {
		console.log(JSON.stringify(tiles, null, 2));
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