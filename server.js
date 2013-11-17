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