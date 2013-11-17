angular.module('Selection', ['Tiles'])
.controller('SelectionCtrl', ['$scope', 'Tiles', 'SelectedTiles',
	function($scope, Tiles, SelectedTiles) {

	// should turn selecting off when leaving the module

	$scope.SelectedTiles = SelectedTiles;
	// $scope.tiles = Tiles.tiles;
	// $scope.selectedTiles = [[]];
	// $scope.selectedTileIndices = {x: -1, y: -1};
	$scope.selectingTiles = false;
	// $scope.defaultHighlight = 'img/highlight.png';

	$scope.tileDown = function(y, x) {
		//console.log("down");
		$scope.selectingTiles = true;
		$scope.setSelectedStartPoint(x, y);
	};

	$scope.tileUp = function(y, x) {
		//console.log("up");
		$scope.selectingTiles = false;
	};

	$scope.tileEnter = function(y, x) {
		//console.log("entered with", $scope.selectingTiles);
		if ($scope.selectingTiles) {
			$scope.setSelectionEndPoint(x, y);
			//$scope.highlightTiles(indices.x, x, indices.y, y);
		}
 	};

	$scope.tileLeave = function(y, x) {

	};

	$scope.unHighlightTiles = function() {
		SelectedTiles.unHighlightTiles();
		/*for (var i = 0; i < $scope.tiles.length; i++) {
			for (var j = 0; j < $scope.tiles[i].length; j++) {
				$scope.tiles[i][j].highlight = 'img/trans.png';
			}
		}*/
	};

	$scope.setSelectedStartPoint = function(x, y) {
		SelectedTiles.setStartPoint(x, y);
		/*$scope.selectedTiles = [[]];
		$scope.unHighlightTiles();
		$scope.selectedTiles[0][0] = $scope.tiles[y][x];
		$scope.selectedTileIndices = {x: x, y: y};
		$scope.tiles[y][x].highlight = $scope.defaultHighlight;*/
	};

	$scope.setSelectionEndPoint = function(x, y) {
		SelectedTiles.setEndPoint(x, y);
		/*$scope.selectedTiles = [];
		var indices = $scope.selectedTileIndices;
		for (var i = indices.y; i <= y; i++) {
			$scope.selectedTiles[indices.y-i] = [];
			for (var j = indices.x; j <= x; j++) {
				$scope.selectedTiles[indices.y-i][indices.x-j] = $scope.tiles[y][x];
				$scope.tiles[y][x].highlight = $scope.defaultHighlight;
			}
		}*/
	};
}])

.factory('SelectedTiles', ['SelectionTiles',
	function(SelectionTiles) {

	return {
		tileset: SelectionTiles.currentTileset,
		selectedTiles: null,
		startPointIndices: {x: -1, y: -1},
		defaultHighlight: 'img/highlight.png',

		setStartPoint: function(x, y) {
			this.selectedTiles = [[]];
			this.unHighlightTiles();
			this.selectedTiles[0][0] = this.tileset.tiles[y][x];
			this.startPointIndices = {x: x, y: y};
			this.tileset.tiles[y][x].highlight = this.defaultHighlight;
		},

		setEndPoint: function(x, y) {
			this.selectedTiles = [];
			var startPoint = this.startPointIndices;
			var endPoint = {x: x, y: y};
			for (var i = startPoint.y; i <= endPoint.y; i++) {
				this.selectedTiles[i-startPoint.y] = [];
				for (var j = startPoint.x; j <= endPoint.x; j++) {
					var currentTile = this.tileset.tiles[i][j];
					this.selectedTiles[i-startPoint.y][j-startPoint.x] = currentTile;
					currentTile.highlight = this.defaultHighlight;
				}
			}
		},

		unHighlightTiles: function() {
			for (var i = 0; i < this.tileset.tiles.length; i++) {
				for (var j = 0; j < this.tileset.tiles[i].length; j++) {
					this.tileset.tiles[i][j].highlight = 'img/trans.png';
				}
			}
		}
	};
}])

.factory('SelectionTiles', ['Tiles', function(Tiles) {
	return {
		currentTileset: Tiles.tilesets[0]
	};
}]);