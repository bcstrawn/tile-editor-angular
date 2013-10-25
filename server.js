var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path');

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

var tiles = [
	[
		{img: 'img/grass.png'},
		{img: 'img/mountains.png'}
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

var saveFile = function(req, callback) {
	var tempPath = req.files.file.path,
		targetPath = path.resolve('./uploads/' + req.body.fileName + '.png');

	// if (path.extname(req.files.file.name).toLowerCase() === '.png') {
	//console.log(req.files.file)
	if (req.files.file.headers['content-type'] === 'image/png') {
		fs.rename(tempPath, targetPath, function(err) {
			if (err) throw err;
			console.log("Upload completed!");
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

app.post('/upload', function (req, res) {
	setTimeout(
		function () {
			res.setHeader('Content-Type', 'text/html');
			//console.log(req.files);
			if (req.files.length == 0 || req.files.file.size == 0)
				res.send({ msg: 'No file uploaded at ' + new Date().toString() });
			else {
				var file = req.files.file;
				saveFile(req, function() {
					res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });
				});
			}
		},
		(req.param('delay', 'yes') == 'yes') ? 2000 : -1
	);
});

app.listen(9999);
console.log('listening on port 9999...');