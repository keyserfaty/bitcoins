var bitApp = angular.module('bitApp', []);

bitApp.controller('mainController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
		
	var prices = {};
	var time = [];
	var activeCoins = ["CAD", "USD", "CLP"];

	// Make POST call when site is loaded
	function saveNew () {
		$http.post('/saveNew')
			.then(function (data) {
				console.log('New entries created successfully');
				// termina el spinner

			}, function (err) {
				console.log(err);
		});
	}


	function getAll () {
		$http.get('/getAll')

			.success(function (data) {
				// Creates object of prices and currencies to display in view
				activeCoins.forEach(function (coin) {
					for (elem in data[0]) {
						if (elem === coin) prices[elem] = data[0][elem];
					}
				});
				$scope.prices = prices;

				// Saves time of last update in array to display in view
				time.push(data[0]["time"]);
				$scope.time = time[0];
			})

			.error(function (data) {
				console.log('Error: ' + data);
			});		
	}

	// Calls POST and GET method for the first time
	saveNew();
	getAll();


}]);