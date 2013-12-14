angular.module('Tiles', ['ngResource'])
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
		},

		generateBlankMap: function(height, width, tileType) {
			var map = [];

			for (var y = 0; y < height; y++) {
				map[y] = [];

				for (var x = 0; x < width; x++) {
					map[y][x] = this.generateTile(tileType);
				}
			}

			return map;
		},

		generateTile: function(tileType) {
			if (tileType == 'grass') {
				return {img: 'img/grass.png', highlight: 'img/trans.png'}; 
			}
		}
	};
}]);