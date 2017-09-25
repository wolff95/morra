'use strict';

angular.module('myApp.home', [])

    .controller('HomeCtrl', ['Choices', 'Results', 'history', 'score', '$timeout', function (Choices, Results, history, score, $timeout, $scope) {
        var vm = this;
        vm.counter = 4;
        vm.choices = Choices;
        vm.results = Results;
        vm.map = {};

        vm.play = function () {
            vm.inGame = true;
        }

        vm.stop = function () {
            vm.inGame = false;
            vm.playerChoice = null;
            vm.computerChoice = null;
            vm.winner = null;
        }

        vm.playerMove = function (choice) {
            vm.playerChoice = choice;
            vm.computerMove()
        }

        vm.result = function (playerChoice, computerChoice) {
            //TODO : Clean this mess!
            if (playerChoice === computerChoice) {
                score.winner(vm.results[2])
                return vm.results[2];
            }
            if (playerChoice === vm.choices[0]) {
                if (computerChoice === vm.choices[2]) {
                    // rock wins
                    score.winner(vm.results[0])
                    return vm.results[0];
                } else {
                    // paper wins
                    score.winner(vm.results[1])
                    return vm.results[1];
                }
            }
            if (playerChoice === vm.choices[1]) {
                if (computerChoice === vm.choices[0]) {
                    // paper wins
                    score.winner(vm.results[0])
                    return vm.results[0];
                } else {
                    // scissors wins
                    score.winner(vm.results[1])
                    return vm.results[1];
                }
            }
            if (playerChoice === vm.choices[2]) {
                if (computerChoice === vm.choices[0]) {
                    // rock wins
                    score.winner(vm.results[1])
                    return vm.results[1];
                } else {
                    // scissors wins
                    score.winner(vm.results[0])
                    return vm.results[0];
                }
            }
        }
     
        vm.computerMove = function(){
            if(vm.counter == 1){
                vm.computerChoice = vm.choices[Math.floor(Math.random() * vm.choices.length)];
                vm.winner = vm.result(vm.playerChoice, vm.computerChoice);
                vm.saveMatch();
                vm.counter = 4;
            }
            else {
                vm.counter--;
                $timeout(vm.computerMove,1000);
            }
        }
        
        vm.saveMatch = function(){
            var match = { player: vm.playerChoice, computer: vm.computerChoice, result: vm.winner }
            history.add(match);
        }

        vm.getList = function(){
            vm.lisHistory = history.get();
        }

    }])
    .directive('choice', function() {
        return {
            restrict: 'E',
            scope : {
                choice : '=',
                user : '='
            },
            templateUrl: 'directive/choice.html'
        }
    })