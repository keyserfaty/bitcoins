var bitApp = angular.module('bitApp', ['angularSpinner']);

bitApp.controller('mainController', ['$scope', '$http', '$interval', 'usSpinnerService', function ($scope, $http, $interval, usSpinnerService) {
		
	var prices = {};
	var time = [];
	var activeCoins = ["CAD", "USD", "CLP"];

	// Make POST call when site is loaded
	$scope.init = function () {
		$http.post('/saveNew')
			.then(function (res) {
				console.log('New entries created successfully');

			}, function (err) {
				console.log(err);
		});
	}

	function getAll () {
		// Starts spinner while view is getting updated
		usSpinnerService.spin('spinner-1');

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

					// View is updated so spinner stops
					usSpinnerService.stop('spinner-1');
			})

			.error(function (data) {
				console.log('Error: ' + data);
			});		
	}

	// Calls GET method for the first time
	getAll();

	// Makes a call to GET method every 15 seconds to bring updated data from db
	$interval(function () {
		console.log('Updates view');
		getAll();
	}, 15000);

}]);