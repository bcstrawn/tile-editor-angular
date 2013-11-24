angular.module('tileEditor', ['angularFileUpload', 'ui.bootstrap', 'Editing', 'Tiles', 'Selection', 'World', 'Minimap', 'Upload'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/map', {templateUrl:'js/map/map.html', controller:'EditingCtrl'});
	$routeProvider.when('/tilesets', {templateUrl:'js/tilesets/tilesets.html', controller:'tilesetsCtrl'});
	$routeProvider.when('/tilesets/:tilesetId', {templateUrl:'js/tilesets/tilesetsEdit.html', controller:'tilesetsCtrl'});
	$routeProvider.when('/upload', {templateUrl:'js/upload/upload.html', controller:'UploadCtrl'});
	$routeProvider.otherwise({redirectTo:'/map'});
}])

.controller('EditorCtrl', ['$scope', '$http', 'Tiles', 'World', '$location', '$window',
	function ($scope, $http, Tiles, World, $location, $window) {
	$scope.world = World.query();
	$scope.tileSize = 32;
	$scope.numTilesWide = $scope.world[0].length;
	$scope.numTilesTall = $scope.world.length;
	$scope.worldWidth = $scope.numTilesWide * $scope.tileSize;
	$scope.worldHeight = $scope.numTilesTall * $scope.tileSize;
	$scope.minimapWidth = $('#minimapContainer').width();
	$scope.minimapHeight = $('#minimapContainer').height();
	$scope.minimapTileSize = Math.floor($scope.minimapWidth / $scope.numTilesWide); // has to be square, with sidebars
	$scope.viewportWidth = $('#viewportContainer').width();
	$scope.viewportHeight = $('#viewportContainer').height();
	$scope.tilesInViewWidth = Math.floor($scope.viewportWidth / $scope.tileSize);
	$scope.tilesInViewHeight = Math.floor($scope.viewportHeight / $scope.tileSize);
	$scope.viewportOutlineWidth = $scope.tilesInViewWidth * $scope.minimapTileSize;
	$scope.viewportOutlineHeight = $scope.tilesInViewHeight * $scope.minimapTileSize;


	var w = angular.element($window);
    $scope.getHeight = function() {
        return w.height();
    };
    $scope.$watch($scope.getHeight, function(newValue, oldValue) {
        $scope.windowHeight = newValue;
    });

    w.bind('resize', function () {
        $scope.$apply();
    });


	$scope.routes = [
		{location: '/map', name: 'Map'},
		{location: '/tilesets', name: 'Tilesets'},
		{location: '/upload', name: 'Upload'}
	];

	$scope.getSelected = function(route) {
		return {'pure-menu-selected': route.location === $location.path()};
	};

	$scope.init = function() {
		$scope.stopDrag();
		$http.get('/tiles').success(function (tiles) {
			console.log(tiles);
			Tiles.tilesets[0].tiles = tiles;
		});
	};

	$scope.stopDrag = function() {
		$('img').live('mousedown', function() { return false; });
		$('.trans').live('mousedown', function() { return false; });

		//console.log(SelectionTiles.currentTiles);
	};

	$scope.addImage = function() {
		$('#editor').after('<img src="http://www.fi.edu/inline2/ben3.gif" alt="ben">');
	};

	$scope.saveMap = function() {
		var map = World.query();
		$http.post('/world', map);
	};

	$scope.loadMap = function() {
		$http.get('/world').success(function (world) {
			World.setWorld(world);
		});
	};

	$scope.stat = function() {
		console.log($location.path());
	};

	$scope.read = function() {
		console.log($('#minimap').width(),
		$('#minimap').height(),
		$('#viewportContainer').width(),
		$('#viewportContainer').height());

		console.log($scope.minimapWidth = $('#minimapContainer').width(),
		$scope.minimapHeight = $('#minimapContainer').height(),
		$scope.viewportWidth = $('#viewportContainer').width(),
		$scope.viewportHeight = $('#viewportContainer').height());
	};

	$scope.tilesets = function() {
		$http.get('/tilesets').success(function (tilesets) {
			console.log(tilesets);
		});
	};

	$scope.upload = function(file, fileName) {
		$http.uploadFile({
			url: '/upload', //upload.php script, node.js route, or servlet upload url)
			// headers: {'optional', 'value'}
			data: {fileName: fileName},
			file: file
		}).then(function (data, status, headers, config) {
			// file is uploaded successfully
			console.log(data);
		});
	};

	$scope.uploadFile = function() {
		var input = $('#myinput');
		var file = input[0].files[0];

		$scope.upload(file, $scope.fileName);
	};

	$scope.init();
}]);


/*var module = angular.module('ContactBuckets', ['ContactDataModule']);

module.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/contacts', {templateUrl:'contacts.html', controller:'ContactController'});
	$routeProvider.when('/edit', {templateUrl:'edit-contact.html', controller:'EditContactController'});
	$routeProvider.when('/edit/:id', {templateUrl:'edit-contact.html', controller:'EditContactController'});
	$routeProvider.otherwise({redirectTo:'/contacts'});
}]);

module.controller('ContactController', ['$scope', 'ContactDataService', function($scope, contactDataService) {
	$scope.contacts = contactDataService.getAll();
	$scope.delete = contactDataService.delete;
}]);

module.controller('EditContactController', ['$scope', '$routeParams', 'ContactDataService', function($scope, $routeParams, contactDataService) {
	if ($routeParams.id) {
		$scope.contact = contactDataService.getOne(parseInt($routeParams.id));
		console.log($scope.contact);
	} else {
		$scope.contact = {};
	}

	$scope.save = function() {
		contactDataService.editOne($routeParams.id, $scope.contact);
	}
}]);*/

/*
var w = angular.element($window);
    $scope.getHeight = function() {
        return w.height();
    };
    $scope.$watch($scope.getHeight, function(newValue, oldValue) {
        $scope.windowHeight = newValue;
        $scope.style = function() {
            return {
                height: newValue + 'px'
            };
        };
    });

    w.bind('resize', function () {
        $scope.$apply();
    });
*/