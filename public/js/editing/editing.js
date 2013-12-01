angular.module('Editing', ['ui.bootstrap', 'World', 'Selection', 'Tiles'])
.controller('EditingCtrl', ['$scope', 'World', 'SelectedTiles', 'TileFactory',
	function($scope, World, SelectedTiles, TileFactory) {

	$scope.World = World;
	$scope.dragging = false;
	$scope.holding = false;
	$scope.position = {};
	$scope.widths = {};
	$scope.rowStyle = {
		width: $scope.world[0].length*33
	};

	$scope.init = function() {
		var mapWidth = $('#map').width();
		$('#viewportBox').width(mapWidth / 2 - 8);
		$('#selectionBox').width(mapWidth / 2 - 8);
	};

	$scope.stopDrag = function() {
		$('img').mousedown(function(){return false});
	};


	$scope.mouseUp = function(y, x) {
		$scope.dragging = false;
	};

	$scope.mouseDown = function(y, x) {
		$scope.dragging = true;
		$scope.setTiles(x, y);
	};

	$scope.mouseEnter = function(y, x) {
		if ($scope.dragging) {
			$scope.setTiles(x, y);
		}
	};

	$scope.mouseLeave = function(y, x) {

	};

	$scope.setTiles = function(x, y) {
		var newTiles = TileFactory.generateTiles(SelectedTiles.selectedTiles);
		World.setTiles(x, y, newTiles);
	};


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
}])

.directive('editTiles', [function() {

}]);