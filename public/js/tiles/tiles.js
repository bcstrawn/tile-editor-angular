angular.module('Tiles', ['ngResource'])
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
}])

.factory('Tiles', ['$http', function ($http) {
	//return $resource('/tiles', {});
	return {
		tilesets: [
			{
				name: 'default',
				tiles: [
					{img: 'img/grass.png'},
					{img: 'img/mountains.png'},
					{img: 'img/cave-20.png'},
					{img: 'img/cave-21.png'}
				]
			}
		]
	};
}])

.factory('TileFactory', [function() {
	return {
		generateTiles: function(tiles) {
			var newTiles = [];

			for (var y = 0; y < tiles.length; y++) {
				newTiles[y] = [];
				for (var x = 0; x < tiles[y].length; x++) {
					newTiles[y][x] = {
						img: tiles[y][x].img,
						highlight: 'img/trans.png'
					};
				}
			}

			return newTiles;
		}
	};
}]);