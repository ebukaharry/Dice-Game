'use strict';

var scores, roundScore, activePlayer, gamePlaying, prevRoll;
newGame();


 // Clicking "ROLL DICE"
 document.querySelector('.btn--roll').addEventListener('click', function() {
     if (gamePlaying){
         // roll dice
        var die = Math.floor(Math.random() * 6) + 1;
        var die2 = Math.floor(Math.random() * 6) + 1;
    
        // display dice
        var dieDOM = document.querySelector('.die');
        dieDOM.style.display = 'block';
        dieDOM.src = 'die-' + die + '.png';

        var die2DOM = document.querySelector('.die-2');
        die2DOM.style.display = 'block';
        die2DOM.src = 'die-' + die2 + '.png';
    
        // Reset global score if a 6 was rolled twice
        if(die === 6 && die2 === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
            nextPlayerTurn();
        }

        // if rolled number was not a 1, then update roundScore
        else if(die !== 1 && die2 !== 1){
            // Add score
            roundScore += die + die2;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        }
        else{
            // Next Plaayer turn
            nextPlayerTurn();
            
            //hide dice when player rolls a 1
            /* dieDOM.style.display = 'none';
            die2DOM.style.display = 'none'; */
        }
     }
     diceRollAudio();

 });

 //The Hold Feature
    document.querySelector('.btn--hold').addEventListener('click', function() {
        if (gamePlaying){
            //Update the Global score to match Current round score
            scores[activePlayer] += roundScore;
    
            //Update the Global score on the UI
            document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    
            //Check if a player wins
           var input = document.getElementById('winning-score').value;
           var winningScore;

            if (input){
                winningScore = input;
            }
            else{
                winningScore = 100;
            }
            
            if(scores[activePlayer] >= winningScore){
                document.querySelector('#name--' + activePlayer).textContent = 'WINNER!';
                document.querySelector('.die').style.display = 'none';
                document.querySelector('.player--' + activePlayer).classList.remove('player--active');
                document.querySelector('.player--' + activePlayer).classList.add('player--winner');
                gamePlaying = false;
                applauseAudio();
            }
            else{
                //Change active player only if current player hasn't won yet
                nextPlayerTurn();
            }
        }

        chaChingAudio();
    });

       //Next player's turn
       function nextPlayerTurn() {
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

            //reset player that rolled a 1 score
            roundScore = 0;
            document.getElementById('current--0').textContent = '0';
            document.getElementById('current--1').textContent = '0';

            //toggle active player
            document.querySelector('.player--0').classList.toggle('player--active');
            document.querySelector('.player--1').classList.toggle('player--active');
       };


       //New Game Initialization
       document.querySelector('.btn--new').addEventListener('click', newGame);

       //Initialize game
       function newGame() {
            scores = [0 , 0];
            roundScore = 0;
            activePlayer = 0;
            gamePlaying = true;

            //hide the die on new game
            document.querySelector('.die').style.display = 'none';
            document.querySelector('.die-2').style.display = 'none';

            // reset scores to 0 on new game
            document.getElementById('score--0').textContent = '0';
            document.getElementById('score--1').textContent = '0';
            document.getElementById('current--0').textContent = '0';
            document.getElementById('current--1').textContent = '0';

            //Reset player 1 to start game
            document.querySelector('.player--0').classList.remove('player--active');
            document.querySelector('.player--1').classList.remove('player--active');
            document.querySelector('.player--0').classList.add('player--active');

            // Remove Congratulatory styles and reset game
            document.querySelector('.player--0').classList.remove('player--winner');
            document.querySelector('.player--1').classList.remove('player--winner');
            document.getElementById('name--0').textContent = 'Player 1';
            document.getElementById('name--1').textContent = 'Player 2';
       }

       function applauseAudio() {
            var applause = document.getElementById("applauseAudio");
            applause.play();
       }

       function diceRollAudio() {
            var diceRoll = document.getElementById("diceRollAudio");
            diceRoll.play();
       }

       function chaChingAudio() {
            var chaChing = document.getElementById("chaChingAudio");
            chaChing.play();
       }
