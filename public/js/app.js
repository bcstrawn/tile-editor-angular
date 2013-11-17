angular.module('tileEditor', ['angularFileUpload', 'ui.bootstrap', 'Editing', 'Tiles', 'Selection', 'World', 'Minimap', 'Upload'])
.controller('EditorCtrl', ['$scope', '$http', 'Tiles', 'World', 'SelectionTiles', 'World',
	function ($scope, $http, Tiles, World, SelectionTiles, World) {
	$scope.world = World.query();

	$scope.init = function() {
		$scope.stopDrag();
		$http.get('/tiles').success(function (tiles) {
			console.log(tiles);
			Tiles.tilesets[0].tiles = tiles;
		});
	};

	$scope.stopDrag = function() {
		$('img').live('mousedown', function() { return false; });
		$('.trans').live('mousedown', function() { return false; });

		console.log(SelectionTiles.currentTiles);
	};

	$scope.addImage = function() {
		$('#editor').after('<img src="http://www.fi.edu/inline2/ben3.gif" alt="ben">');
	};

	$scope.saveMap = function() {
		var map = World.query();
		$http.post('/world', map);
	};

	$scope.loadMap = function() {
		$http.get('/world').success(function (world) {
			World.setWorld(world);
		});
	};

	$scope.stat = function() {
		$http.get('/stat').success(function (stats) {
			console.log(stats);
		});
	};

	$scope.read = function() {
		$http.get('/read');
	};

	$scope.upload = function(file, fileName) {
		$http.uploadFile({
			url: '/upload', //upload.php script, node.js route, or servlet upload url)
			// headers: {'optional', 'value'}
			data: {fileName: fileName},
			file: file
		}).then(function (data, status, headers, config) {
			// file is uploaded successfully
			console.log(data);
		});
	};

	$scope.uploadFile = function() {
		var input = $('#myinput');
		var file = input[0].files[0];

		$scope.upload(file, $scope.fileName);
	};

	$scope.init();
}]);