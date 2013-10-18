var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path');

app.configure(function() {
	app.use(express.static(__dirname));
	app.use(express.bodyParser());
});

var saveFile = function(req, callback) {
	var tempPath = req.files.file.path,
		targetPath = path.resolve('./uploads/image.png');

	if (path.extname(req.files.file.name).toLowerCase() === '.png') {
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
	console.log(req);
	setTimeout(
		function () {
			res.setHeader('Content-Type', 'text/html');
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

app.listen(3030);
console.log('listening on 3030');