'use strict';

angular.module('myApp.home', [])

    .controller('HomeCtrl', [function ($scope) {
        var vm = this;

   /*     vm.object = [{ 
            name: 'scissor',
             value: 0,
             winAgainst : [
                vm.object[1].value
             ],
             loseAgainst : [
                vm.object[2].value
             ],
        },
        { 
            name: 'paper',
             value: 1,
             winAgainst : [
                vm.object[2].value
             ],
             loseAgainst : [
                vm.object[0].value
             ]
        },
        { 
            name: 'rock',
             value: 2,
             winAgainst : [
                vm.object[0].value
             ],
             loseAgainst : [
                vm.object[1].value
             ]
        }];*/

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
            if (choice1 === "paper") {
                if (choice2 === "rock") {
                    vm.winner = "paper wins";
                } else {
                    if (choice2 === "scissor") {
                        vm.winner = "scissors wins";
                    }
                }
                if (choice1 === "scissor") {
                    if (choice2 === "rock") {
                        vm.winner = "rock wins";
                    } else {
                        if (choice2 === "paper") {
                            vm.winner = "scissors wins";
                        }
                    }
                }
            }
        }

        vm.computerMove = function () {
            //Random pick a number from 0 to 2
            vm.myArray = ["paper", "rock", "rock"];
            vm.computerChoice = vm.myArray[Math.floor(Math.random() * vm.myArray.length)];
            vm.result(vm.playerChoice, vm.computerChoice);
        }

    }]);