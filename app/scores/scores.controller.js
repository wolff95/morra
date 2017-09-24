'use strict';

angular.module('myApp.score', [])

    .controller('ScoreCtrl', ['history', function (history, $scope) {
        var vm = this;
        vm.results = [{id : 0, text : 'You win!'}, { id : 1, text : 'You lose!'}, { id : 2, text : 'Draw!'}];
        vm.choices = [{id : 0, name : 'rock'}, { id : 1, name : 'paper'}, {id : 2, name : 'scissors'}];
        vm.query = { choice : -1, result : -1}
        vm.lisHistory = history.get();

    }])
    .directive('historyList', function(){
        return {
            restrict: 'E',
            scope : {
                model : '='
            },
            templateUrl: 'directive/historyList.html'
        }
    });