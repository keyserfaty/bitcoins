var bitApp = angular.module('bitApp', ['angularSpinner']);

bitApp.controller('mainController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
	// meter todo esto en un función y llamarla cada 15 seg
		
		var prices = {};
		var time = [];
		var activeCoins = ["CAD", "USD", "CLP"];

		$http.get('/getAll')

			.success(function (data) {

				$interval(function () {
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
				
				}, 1000);


				// Makes a call to POST method every time the page is loaded

				$http.post('/saveNew')
					.then(function (res) {
						console.log('New entries created successfuly');
						// usSpinnerService.stop('spinner-1');

					}, function (err) {
						console.log(err);
				});

				// usSpinnerService.spin('spinner-1');
				
			})

			.error(function (data) {
				console.log('Error: ' + data);
			});


}]);