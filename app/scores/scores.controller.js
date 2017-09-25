'use strict';

angular.module('myApp.score', [])

    .controller('ScoreCtrl', ['Choices', 'Results', 'history', function (Choices, Results, history, $scope) {
        var vm = this;
        vm.choices = Choices;
        vm.results = Results;
        vm.filter = {};
        vm.lisHistory = history.get();

    }])
    .directive('historyList', function(){
        return {
            restrict: 'E',
            scope : {
                model : '=',
                filter : '='
            },
            templateUrl: 'directive/historyList.html'
        }
    })
    .service('history', function() {
        var history = {
            list : [],
            add : add,
            get : get
          }
        
          return history;
        
          function add(match){
            history.list.push(match);
          }

          function get(){
            return history.list;
          }
        
    })
    .filter('historyFilter', function () {
        return function (matches, filter) {
            matches = _.filter(matches, function(match){
                return (!filter.choiceId && filter.choiceId != 0) || match.player.id == filter.choiceId || match.computer.id == filter.choiceId;
            })
            matches = _.filter(matches, function(match){
                return (!filter.matchResultId && filter.matchResultId != 0) || match.result.id == filter.matchResultId;
            })
            return matches;
        }
    })