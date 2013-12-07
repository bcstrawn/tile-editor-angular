angular.module('Selection', ['Tiles'])
/*.controller('SelectionCtrl', ['$scope', 'Tiles', 'SelectedTiles',
	function($scope, Tiles, SelectedTiles) {

	// should turn selecting off when leaving the module

	$scope.SelectedTiles = SelectedTiles;
	$scope.selectingTiles = false;

	

	$scope.tileDown = function(y, x) {
		$scope.selectingTiles = true;
		$scope.setSelectedStartPoint(x, y);
	};

	$scope.tileUp = function(y, x) {
		$scope.selectingTiles = false;
	};

	$scope.tileEnter = function(y, x) {
		if ($scope.selectingTiles) {
			$scope.setSelectionEndPoint(x, y);
		}
	};

	$scope.tileLeave = function(y, x) {

	};

	$scope.unHighlightTiles = function() {
		SelectedTiles.unHighlightTiles();
	};

	$scope.setSelectedStartPoint = function(x, y) {
		SelectedTiles.setStartPoint(x, y);
	};

	$scope.setSelectionEndPoint = function(x, y) {
		SelectedTiles.setEndPoint(x, y);
	};

	$scope.moduleLeave = function() {
		$scope.selectingTiles = false;
	};
}])*/

.factory('SelectedTiles', ['Tiles', function(Tiles) {
	return {
		tileset: Tiles.tilesets[0],
		selectedTiles: null,
		/*startPointIndices: {x: -1, y: -1},
		defaultHighlight: 'img/highlight.png',

		setStartPoint: function(x, y) {
			this.selectedTiles = [[]];
			this.unHighlightTiles();
			this.selectedTiles[0][0] = this.tileset.tiles[y][x];
			this.startPointIndices = {x: x, y: y};
			this.highlightTile(this.tileset.tiles[y][x]);
		},

		setEndPoint: function(x, y) {
			this.selectedTiles = [];
			var startPoint = this.startPointIndices;
			var endPoint = {x: x, y: y};
			for (var y = startPoint.y; y <= endPoint.y; y++) {
				this.selectedTiles[y-startPoint.y] = [];
				for (var x = startPoint.x; x <= endPoint.x; x++) {
					var currentTile = this.tileset.tiles[y][x];
					this.selectedTiles[y-startPoint.y][x-startPoint.x] = currentTile;
					this.highlightTile(currentTile);
				}
			}
		},

		unHighlightTiles: function() {
			for (var i = 0; i < this.tileset.tiles.length; i++) {
				for (var j = 0; j < this.tileset.tiles[i].length; j++) {
					this.tileset.tiles[i][j].highlight = 'img/trans.png';
				}
			}
		},

		highlightTile: function(tile) {
			tile.highlight = this.defaultHighlight;
		}*/
	};
}])

.directive('tileGrid', function() {
	return {
		restrict: 'E',
		templateUrl: 'tileGrid.html',
		// pass these two names from attrs into the template scope
		scope: {
			tileGrid: '='
		},
		controller: function($scope) {
			
		},
		link: function($scope, elem, attrs) {
			elem.bind('mouseleave', function() {
				$scope.tileGrid.moduleLeave();
			});
		}
	};
});