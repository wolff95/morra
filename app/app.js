'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.score',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

      $routeProvider.when('/home', {
        templateUrl: 'home/home.view.html',
        controller: 'HomeCtrl'
      })

      $routeProvider.when('/scores', {
        templateUrl: 'scores/scores.view.html',
        controller: 'ScoresCtrl'
      })

      $routeProvider.otherwise({ redirectTo: '/home' });
    }]);
