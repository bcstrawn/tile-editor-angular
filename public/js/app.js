angular.module('tileEditor', ['angularFileUpload', 'ui.bootstrap', 'Editing', 'Tiles', 'Selection', 'World', 'Minimap', 'Upload'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/map', {templateUrl:'js/map/map.html', controller:'EditingCtrl'});
	$routeProvider.when('/tilesets', {templateUrl:'js/tilesets/tilesets.html', controller:'tilesetsCtrl'});
	$routeProvider.when('/tilesets/:tilesetId', {templateUrl:'js/tilesets/tilesetsEdit.html', controller:'tilesetsCtrl'});
	$routeProvider.when('/upload', {templateUrl:'js/upload/upload.html', controller:'UploadCtrl'});
	$routeProvider.otherwise({redirectTo:'/map'});
}])

.controller('EditorCtrl', ['$scope', '$http', 'Tiles', 'World',
	function ($scope, $http, Tiles, World) {
	$scope.world = World.query();

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
		$http.get('/stat').success(function (stats) {
			console.log(stats);
		});
	};

	$scope.read = function() {
		$http.get('/read');
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