'use strict';

angular.module('myApp.main', [])

    .controller('MainCtrl', ['score', '$rootScope', function (score, $rootScope, $scope) {
        var vm = this;

        $rootScope.$on('scoreChanged', function (change) { 
            vm.playerScore = score.player;
            vm.computerScore = score.computer;
            vm.drawScore = score.draw;
          });

    }])
    .service('score', ['$rootScope', function($rootScope){
        var score = {
            player : 0,
            computer : 0,
            draw : 0,
            winner : winner
        }

        return score;

        function winner(result){
            if (result.id == 0)
                score.player++;
            else if(result.id == 1)
                score.computer++;
            else 
                score.draw++;
            $rootScope.$broadcast('scoreChanged');
        }
    }])
    .constant('Choices', [{id : 0, name : 'rock'}, { id : 1, name : 'paper'}, {id : 2, name : 'scissors'}])
    .constant('Results', [{id : 0, text : 'You win!'}, { id : 1, text : 'You lose!'}, { id : 2, text : 'Draw!'}]);