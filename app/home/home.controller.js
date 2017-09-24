'use strict';

angular.module('myApp.home', [])

    .controller('HomeCtrl', ['choosing', function (choosing, $scope) {
        var vm = this;
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

        vm.computerMove = function () {
            //Random pick a number from 0 to 2
            vm.computerChoice = vm.choices[Math.floor(Math.random() * vm.choices.length)];
            vm.winner = vm.result(vm.playerChoice, vm.computerChoice);
        }

    }])
    .directive('choice', function() {
        return {
            restrict: 'E',
            scope : {
                choice : '=',
                user : '='
            },
            templateUrl: 'directive/choice.html',
            link: function(scope){
                console.log(scope.choice);
            }
        }
    })
    .service('choosing', function() {
        var choosing = {
            player : player,
            computer : computer
          }
        
          return choosing;
        
          function player(){
            vm.playerChoice = choice;
            vm.computerMove()
            return "hokla";
          }

          function computer(){
            return "hokla";
          }
        
    })