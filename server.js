var express = require('express'),
	app = express();

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

app.listen(9999);