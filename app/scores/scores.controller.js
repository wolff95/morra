'use strict';

angular.module('myApp.score', [])

.controller('ScoreCtrl', ['history', function(history, $scope) {
    var vm = this;

    vm.lisHistory = history.get();

}]);