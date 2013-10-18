angular.module('World', [])
.factory('World', function() {
	return {
		world: null,

		createTile: function() {
			return {img: 'img/grass.png', highlight: 'img/trans.png'};
		},

		query: function() {
			if (this.world) {
				return this.world;
			}

			this.world = [];
			for (var i = 0; i < 15; i++) {
				this.world[i] = [];
				for (var j = 0; j < 20; j++) {
					this.world[i][j] = this.createTile();
				}
			}
			return this.world;
		},

		setTiles: function(x, y, tiles) {
			// this.world[y][x] = tiles[0][0];
			for (var i = 0; i < tiles.length; i++) {
				for (var j = 0; j < tiles[i].length; j++) {
					this.world[y+i][x+j].img = tiles[i][j].img;
				}
			}
		},

		setWorld: function(world) {
			this.world = world;
		}
	};
});