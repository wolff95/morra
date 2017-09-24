'use strict';

angular.module('myApp.home', [])

    .controller('HomeCtrl', ['history', '$timeout', function (history, $timeout, $scope) {
        var vm = this;
        vm.counter = 4;
        vm.choices = ["rock", "paper", "scissors"];
        vm.map = {};
        
        vm.choices.forEach(function(choice, i) {
            vm.map[choice] = {};
            vm.map[choice][choice] = "Was a tie"
            vm.map[choice][vm.choices[(i+1)%3]] = vm.choices[(i+1)%3] + " wins"
            vm.map[choice][vm.choices[(i+2)%3]] = choice + " wins"
        })

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

        vm.result = function (choice1, choice2) {
            //Qualcosa del genere.
            if (choice1 === choice2) {
                return "It's a tie!";
            }
            if (choice1 === "rock") {
                if (choice2 === "scissors") {
                    // rock wins
                    return "You win!";
                } else {
                    // paper wins
                    return "You lose! Try again.";
                }
            }
            if (choice1 === "paper") {
                if (choice2 === "rock") {
                    // paper wins
                    return "You win!";
                } else {
                    // scissors wins
                    return "You lose! Try again.";
                }
            }
            if (choice1 === "scissors") {
                if (choice2 === "rock") {
                    // rock wins
                    return "You lose! Try again.";
                } else {
                    // scissors wins
                    return "You win!";
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
            var match = { player: vm.playerChoice, computer: vm.computerChoice, result: vm.winner}
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