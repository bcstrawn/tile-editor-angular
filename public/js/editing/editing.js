angular.module('Editing', ['ui.bootstrap', 'World', 'Selection', 'Tiles'])
.controller('EditingCtrl', ['$scope', 'World', 'SelectedTiles', 'TileFactory',
	function($scope, World, SelectedTiles, TileFactory) {

	$scope.World = World;
	$scope.dragging = false;
	$scope.holding = false;
	$scope.selectedTiles = null;
	
	$('#minimap').onselectstart = function () { return false; };

	$scope.init = function() {
		var mapWidth = $('#map').width();
		$('#viewportBox').width(mapWidth / 2 - 8);
		$('#selectionBox').width(mapWidth / 2 - 8);
	};

	$scope.getWidth = function() {
		return $scope.selectionGrid.tiles[0].length * 33;
	};


	$scope.mapGrid = {
		dragging: false,
		tiles: null,
		rowStyle: {
			width: this.tiles[0].length*33
		},

		mouseDown: function(x, y) {
			this.dragging = true;
			this.setTiles(x, y);
		},

		mouseUp: function(x, y) {
			this.dragging = false;
		},

		mouseEnter: function(x, y) {
			if (this.dragging) {
				this.setTiles(x, y);
			}
		},

		mouseLeave: function(x, y) {

		},

		setTiles: function(x, y) {
			var tiles = TileFactory.generateTiles($scope.selectedTiles);

			for (var i = 0; i < tiles.length; i++) {
				for (var j = 0; j < tiles[i].length; j++) {
					this.tiles[y+i][x+j].img = tiles[i][j].img;
				}
			}
		},

		createTile: function() {
			return {img: 'img/grass.png', highlight: 'img/trans.png'};
		}
	};


	$scope.selectionGrid = {
		dragging: false,
		tiles: null,
		startPointIndices: {x: -1, y: -1},
		defaultHighlight: 'img/highlight.png',

		mouseDown: function(x, y) {
			this.dragging = true;
			$scope.setStartPoint(x, y);
		},

		mouseUp: function(x, y) {
			this.dragging = false;
		},

		mouseEnter: function(x, y) {
			if (this.dragging) {
				$scope.setEndPoint(x, y);
			}
		},

		mouseLeave: function(x, y) {

		},

		moduleLeave: function() {
			this.dragging = false;
		},

		setStartPoint: function(x, y) {
			this.unHighlightTiles();
			$scope.selectedTiles = [[]];
			$scope.selectedTiles[0][0] = this.tiles[y][x];
			this.startPointIndices = {x: x, y: y};
			this.highlightTile(this.tiles[y][x]);
		},

		setEndPoint: function(x, y) {
			this.unHighlightTiles();
			$scope.selectedTiles = [];
			var startPoint = this.startPointIndices;
			var endPoint = {x: x, y: y};
			for (var y = startPoint.y, baseY = 0; y <= endPoint.y; y++, baseY++) {
				$scope.selectedTiles[baseY] = [];
				for (var x = startPoint.x, baseX = 0; x <= endPoint.x; x++, baseX++) {
					var currentTile = this.tiles[y][x];
					$scope.selectedTiles[baseY][baseX] = currentTile;
					this.highlightTile(currentTile);
				}
			}
		},

		unHighlightTiles: function() {
			for (var i = 0; i < this.tiles.length; i++) {
				for (var j = 0; j < this.tiles[i].length; j++) {
					this.tiles[i][j].highlight = 'img/trans.png';
				}
			}
		},

		highlightTile: function(tile) {
			tile.highlight = this.defaultHighlight;
		}
	};


	$scope.minimapGrid = {
		dragging: false,
		tiles: null,
		borderStyle: {top: 0, left: 0},
		rowStyle: {
			width: this.tiles[0].length*8
		},

		mouseDown: function(y, x) {
			this.dragging = true;
			$scope.goTo(x, y);
		},

		mouseUp: function() {
			this.dragging = false;
		},

		mouseEnter: function(y, x) {
			if (this.dragging) {
				$scope.goTo(x, y);
			}
		},

		goTo: function(x, y){
			var xPosition = (x - 8) * 34;
			if (xPosition < 0) {
				xPosition = 0;
			}

			var yPosition = (y - 5) * 34;
			if (yPosition < 0) {
				yPosition = 0;
			}

			var elem = $('#editWorld');
			elem.scrollTop(yPosition);
			elem.scrollLeft(xPosition);

			// 128 - 64
			var xMinimap = x*8 - 64;
			if (xMinimap < 0) {
				xMinimap = 0;
			} else if (xMinimap > 30) {
				xMinimap = 30;
			}

			//  80 - 40
			var yMinimap = y*8 - 40;
			if (yMinimap < 0) {
				yMinimap = 0;
			} else if (yMinimap > 38) {
				yMinimap = 38;
			}

			$scope.borderStyle = {
				top: yMinimap,
				left: xMinimap
			};
		}
	};






	$scope.position = {};
	$scope.widths = {};

	$scope.mapMove = function(e) {
		if ($scope.holding) {
			var xDiff = e.pageX - $scope.position.x;
			$('#viewportBox').width($scope.widths.a + xDiff);
			$('#selectionBox').width($scope.widths.b - xDiff);
			// position = {x: e.pageX, y: e.pageY};

			/*var mapWidth = $('#map').width();
			var barWidth = $('#mover').width();
			var viewWidth = $('#viewportBox').width();
			var selectWidth = $('#selectionBox').width();
			console.log(viewWidth, '+', selectWidth, '+', barWidth, '=', viewWidth + selectWidth + barWidth, '=', mapWidth, '?');*/
		}
	};

	$scope.moverDown = function(e) {
		$scope.holding = true;
		$scope.position = {x: e.pageX, y: e.pageY};
		var width = $('#viewportBox').width();
		var width2 = $('#selectionBox').width();
		$scope.widths = {a: width, b: width2};
	};

	$scope.moverUp = function() {
		$scope.holding = false;
	};

	$scope.mapLeave = function() {
		$scope.holding = false;
	};

	$scope.init();
}]);