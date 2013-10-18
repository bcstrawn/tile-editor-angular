angular.module('Editing', ['ui.bootstrap', 'World', 'Selection', 'Tiles'])
.controller('EditingCtrl', ['$scope', 'World', 'SelectedTiles', 'TileFactory',
	function($scope, World, SelectedTiles, TileFactory) {

	$scope.World = World;
	$scope.dragging = false;
	$scope.rowStyle = {
		width: $scope.world[0].length*33
	};

	$scope.stopDrag = function() {
		$('img').mousedown(function(){return false});
	};


	$scope.mouseUp = function(y, x) {
		$scope.dragging = false;
	};

	$scope.mouseDown = function(y, x) {
		$scope.dragging = true;
		// console.log('setting the tile at ' + x + ', ' + y);
		// console.log(SelectedTiles.selectedTiles);
		$scope.setTiles(x, y);
	};

	$scope.mouseEnter = function(y, x) {
		if ($scope.dragging) {
			$scope.setTiles(x, y);
		}
	};

	$scope.mouseLeave = function(y, x) {
		//console.log("left");
	};

	$scope.setTiles = function(x, y) {
		var newTiles = TileFactory.generateTiles(SelectedTiles.selectedTiles);
		World.setTiles(x, y, newTiles);
	};
}]);