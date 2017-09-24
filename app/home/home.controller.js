'use strict';

angular.module('myApp.home', [])

    .controller('HomeCtrl', ['history', '$timeout', function (history, $timeout, $scope) {
        var vm = this;
        vm.counter = 4;
        vm.playerScore = vm.computerScore = 0;
        vm.results = [{id : 0, text : 'You win!'}, { id : 1, name : 'You lose!'}, { id : 2, text : 'Draw!'}];
        vm.choices = [{id : 0, name : 'rock'}, { id : 1, name : 'paper'}, {id : 2, name : 'scissors'}];
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
                return vm.results[2];
            }
            if (playerChoice === vm.choices[0]) {
                if (computerChoice === vm.choices[2]) {
                    // rock wins
                    vm.playerScore++;
                    return vm.results[0];
                } else {
                    // paper wins
                    vm.computerScore++;
                    return vm.results[1];
                }
            }
            if (playerChoice === vm.choices[1]) {
                if (computerChoice === vm.choices[0]) {
                    // paper wins
                    vm.playerScore++;
                    return vm.results[0];
                } else {
                    // scissors wins
                    vm.computerScore++;
                    return vm.results[1];
                }
            }
            if (playerChoice === vm.choices[2]) {
                if (computerChoice === vm.choices[0]) {
                    // rock wins
                    vm.computerScore++;
                    return vm.results[1];
                } else {
                    // scissors wins
                    vm.playerScore++;
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