angular.module('Upload', ['angularFileUpload'])

.controller('UploadCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.fileName = '';

	$scope.upload = function(file, fileName) {
		$http.uploadFile({
			url: '/upload', //upload.php script, node.js route, or servlet upload url)
			// headers: {'optional', 'value'}
			data: {fileName: fileName},
			file: file
		}).then(function(data, status, headers, config) {
			// file is uploaded successfully
			console.log(data);
		});
	};

	$scope.uploadFile = function() {
		var input = $('#myinput');
		var file = input[0].files[0];

		$scope.upload(file, $scope.fileName);
	};
}]);