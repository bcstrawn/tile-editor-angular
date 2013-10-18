angular.module('Users', [])
.factory('Users', function() {
	return {
		users: [
			{name: "Ben"},
			{name: "Adam"}
		]
	};
});

angular.module('Home', ['Users', 'ngUpload'])
.controller('testCtrl', ['$scope', '$http', 'Users', function($scope, $http, Users) {
	$scope.testData = "angular";

	$scope.Users = Users;

	$scope.name = '';

	$scope.submit = function() {
		alert($scope.name);
	};


	$scope.uploadComplete = function (content, completed) {
		if (completed && content.length > 0) {
			$scope.response = JSON.parse(content); // Presumed content is a json string!
			$scope.response.style = {
			color: $scope.response.color,
			"font-weight": "bold"
		};

		// Clear form (reason for using the 'ng-model' directive on the input elements)
		$scope.fullname = '';
		$scope.gender = '';
		$scope.color = '';
		// Look for way to clear the input[type=file] element
		}
	};
}]);