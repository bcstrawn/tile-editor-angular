angular.module('Tiles', ['ngResource'])
.factory('Tiles', ['$http', function($http) {
	// return $resource('/tiles'/);
	return {
		tiles: [
			[
				{img: 'img/grass.png'},
				{img: 'img/mountains.png'}
			]
		],

		query: function() {
			return this.tiles;
		}
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