angular.module('Tilesets', ['Tiles'])
.controller('tilesetsCtrl', ['$scope', '$http', 'SelectedTiles', 'Tiles', '$routeParams',
	function ($scope, $http, SelectedTiles, Tiles, $routeParams) {

	$scope.tilesets = [];
	if ($routeParams.tilesetId) {
		$scope.tileset = Tiles.tilesets[$routeParams.tilesetId];
	}

	$scope.init = function() {
		$http.get('/tilesets').success(function (tilesets) {
			Tiles.tilesets = tilesets;
			$scope.tilesets = tilesets;
			console.log(tilesets);
		});
	};

	$scope.changeTileset = function(index) {
		console.log('changing to index', index);
		SelectedTiles.tileset = Tiles.tilesets[index];
		console.log(SelectedTiles.tileset);
	};

	$scope.init();
}]);