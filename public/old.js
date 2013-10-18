/*.directive('tile', function () {
	return {
		restrict: 'E',
		template: 	'<div class="tile" ng-click="setTile($parent.$index, $index)" ng-mouseover="mouseOver($parent.$parent.$index, $parent.$index)">' +
						'<img ng-src="{{tile.img}}">' +
						'<img ng-src="{{tile.highlight}}" class="highlight">' +
					'</div>',
		scope: {
			tile: '=',
			onMouseOver: '&'
		},
		link: function (scope, elem, attrs) {
			scope.setTile = function(y, x) {
				scope.tile.img = 'img/empty.png';
				console.log("Changed tile at (" + x + ", " + y + ").")
			}

			scope.mouseDown = function() {
			}

			scope.mouseOver = function(y, x) {
				scope.onMouseOver({x: x, y: y});
			}
		}
	}
})

.directive('editWorld', function () {
	return {
		restrict: 'A',
		priority: 2,
		template: 	'<div ng-repeat="row in world" class="tileRow">' +
						'<tile ng-repeat="tile in row" tile="tile" on-mouse-over="mouse(x, y)">' +
					'</div>',
		scope: {
			world: '='
		},
		link: function (scope, elem, attrs) {
			scope.mouse = function(x, y) {
				console.log(x, y);
			}
		}
	}
})

.directive('selectTiles', function () {
	return {
		restrict: 'A',
		priority: 1,
		template: 	'<div ng-repeat="row in tiles" class="tileRow">' +
						'<tile ng-repeat="tile in row" tile="tile" on-mouse-over="mouse(x, y)">' +
					'</div>',
		scope: {
			tiles: '='
		},
		link: function (scope, elem, attrs) {
			scope.mouse = function(x, y) {
				console.log(scope.tiles, x, y);
				scope.tiles[y][x].highlight = 'img/highlight.png';
			}
		}
	}
})

.directive('stopEvent', function () {
	return {
	    restrict: 'A',
	    link: function (scope, element, attr) {
	        element.bind(attr.stopEvent, function (e) {
	            e.stopPropagation();
	        });
	    }
	}
});*/




/*.directive('fundooRating', function () {
	return {
		restrict: 'A',
		template: '<ul class="rating">' +
								'<li ng-repeat="star in stars" ng-class="star">' +
									'\u2605' +
								'</li>' +
							'</ul>',
		scope: {
			ratingValue: '=',
			max: '='
		},
		link: function (scope, elem, attrs) {
			scope.stars = [];
			for (var  i = 0; i < scope.max; i++) {
				scope.stars.push({filled: i < scope.ratingValue});
			}
		}
	}
})*/

//$('#id-of-your-image').mousedown(function(){return false});

/*angular.module('FundooDirectiveTutorial', [])
  .controller('FundooCtrl', function($scope, $window) {
    $scope.rating = 5;
    $scope.saveRatingToServer = function(rating) {
      $window.alert('Rating selected - ' + rating);
    };
  })
  .directive('fundooRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
      }
    }
  });*/









	<!-- Rating is {{rating}} <br/>
	 <div fundoo-rating rating-value="rating" max="10"></div>

	 <div >
	    <tabs>
	        <pane heading="Static title">Static content</pane>
	        <pane ng-repeat="pane in panes" heading="{{pane.title}}" active="pane.active">{{pane.content}}</pane>
	    </tabs>
	    <div class="row-fluid">
	        <button class="btn" ng-click="panes[0].active = true">Select second tab</button>
	        <button class="btn" ng-click="panes[1].active = true">Select third tab</button>
	    </div>
	</div>

	<div>
		<div ng-repeat="row in world" class="tileRow">
			<tile ng-repeat="tile in row" tile="tile">
		</div>
	</div>

	<button ng-click="disableDrag()">Disable</button> -->




	<!-- 
	<div menubar></div>
	<div class="left">
		<tabs>
			<pane></pane>
		</tabs>
	</div>
	<div class="right">
		<div minimap></div>
		<tabs>
			<pane></pane>
		</tabs>
	</div>

	MVP:
		show world (of tiles)
		show grid of placeable tiles
		select a placeable tile
		highlight hovered world tile with selected tile
		place a selected tile on world
		drag to select many tiles
		place a group of selected tiles on world
			need to be able to access peer tiles
				solved by:
				ng-click="loadFromMenu($parent.$index, $index)"
				found here: http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat

 -->