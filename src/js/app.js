'use strict';

const bitApp = angular.module('bitApp', ['angularSpinner']);

bitApp.controller('mainController', ['$scope', '$http', '$interval', 'usSpinnerService', function ($scope, $http, $interval, usSpinnerService) {
    
  let prices = {};
  let time = [];
  let activeCoins = ["CAD", "USD", "CLP"];
  
  let getAll = function () {
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

      let spinner = $interval(function () {
        usSpinnerService.stop('spinner-1');
      }, 1000, 1);

    })

    .error(function (err) {
      console.log('Error: ' + err);
    });   
  }

  let updateView = $interval(function () {
        usSpinnerService.spin('spinner-1');  
    getAll();
  }, 15000);
  
  getAll();

}]);