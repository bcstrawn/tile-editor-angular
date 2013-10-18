angular.module('Minimap', ['World'])
.controller('minimapCtrl', ['$scope', 'World', function($scope, World) {
	$scope.World = World;
	$scope.holding = false;
	$scope.borderStyle = {top: 0, left: 0};
	$scope.rowStyle = {
		width: $scope.world[0].length*8
	};

	$('#minimap').onselectstart = function () { return false; };

	$scope.tileDown = function(y, x) {
		$scope.holding = true;
		$scope.goTo(x, y);
	};

	$scope.tileEnter = function(y, x) {
		if ($scope.holding) {
			$scope.goTo(x, y);
		}
	};

	$scope.tileUp = function() {
		$scope.holding = false;
	};

	$scope.goTo = function(x, y){
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
	};
}]);