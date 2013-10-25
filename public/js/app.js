angular.module('tileEditor', ['angularFileUpload', 'ui.bootstrap', 'Editing', 'Tiles', 'Selection', 'World', 'Minimap'])
.controller('EditorCtrl', ['$scope', 'Tiles', 'World', 'SelectionTiles', 'World', '$http',
	function($scope, Tiles, World, SelectionTiles, World, $http) {
	$scope.world = World.query();

	$scope.init = function() {
		$scope.stopDrag();
	};

	$scope.stopDrag = function() {
		// console.log('stopping');
		$('img').live('mousedown', function(){return false});
		$('.trans').live('mousedown', function(){return false});

		console.log(SelectionTiles.currentTiles);
	};

	$scope.addImage = function() {
		$('#editor').after('<img src="http://www.fi.edu/inline2/ben3.gif" alt="ben">');
	};

	$scope.saveMap = function() {
		var map = World.query();
		$http.post('/world', map);
	};

	$scope.loadMap = function() {
		$http.get('/world').success(function(world) {
			World.setWorld(world);
		});
	};

	$scope.uploadSprite = function() {
		var input = $('#spriteToUpload');
		var file = input[0].files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			var img = new Image();
			img.src = e.target.result;
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');

			canvas.width = 32;
			canvas.height = 32;

			context.drawImage(img, 0, 0, 32, 32, 0, 0, canvas.width, canvas.height);

			$scope.uploadImageFromCanvas(canvas);
		};

		reader.readAsDataURL(file);
	};

	$scope.uploadImageFromCanvas = function(canvas) {
		canvas.toBlob(function (blob) {
			console.log(blob);
			$http.uploadFile({
				url: '/upload',
				// headers: {'optional', 'value'}
				data: {fileName: $scope.fileName},
				file: blob
			}).progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).then(function(data, status, headers, config) {
				console.log(data);
			});
		},
		'image/png');
	};

	/*$scope.imateInit = function() {
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var imageObj = new Image();

		imageObj.onload = function() {
			ctx.drawImage(imageObj, 0, 0);
			imageObj.src = "tilesetImageLocationHere";
		};

		var imageWidth = x;
		var imageHeight = x;
		var tileWidth = x;
		var tileHeight = x;

		var tilesX = imageWidth / tileWidth;
		var tilesY = imageHeight / tileHeight;
		var totalTiles = tilesX * tilesY;        
		var tileData = new Array();

		for(var i = 0; i < tilesY; i++) {
			for(var j = 0; j < tilesX; j++) {
				// Store the image data of each tile in the array.
				tileData.push(ctx.getImageData(j*tileWidth, i*tileHeight, tileWidth, tileHeight);
			}
		}
		//From here you should be able to draw your images back into a canvas like so:
		ctx.putImageData(tileData[0], x, y);
	};


	var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

    $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success( ...all right!... ).error( ..damn!... );*/

	$scope.init();
}]);