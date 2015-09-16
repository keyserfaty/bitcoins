var bitApp = angular.module('bitApp', []);

bitApp.controller('mainController', function ($scope, $http) {
	
	var prices = {};
	var time = [];
	var activeCoins = ["CAD", "USD", "CLP"];

	$http.get('/getAll')

		.success(function (data) {

			activeCoins.forEach(function (coin) {
				for (elem in data[0]) {
					if (elem === coin) prices[elem] = data[0][elem];
				}
			});

			time.push(data[0]["time"]);
			$scope.time = time[0];

			$scope.prices = prices;
		})

		.error(function (data) {
			console.log('Error: ' + data);
		});
});