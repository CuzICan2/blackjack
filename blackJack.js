/* A game of Black Jack */
/* The logic is not complete - 
  - When user has an ace
  - when user has several aces
  - when dealer has several aces 
  - somehow the user fat situation does not display the winner
*/

let suits = ["Hearts", "Clubs", "Diamonds", "Spades"]; 
let values = ["Ace", "King", "Queen", "Jack",
              "Ten", "Nine", "Eight", "Seven", 
              "Six", "Five", "Four", "Three", "Two"
              ]; 
              
let textArea = document.getElementById('text-area'); 
let newGameButton = document.getElementById('newGame-button'); 
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

//Game variables
let gameStarted = false, 
    gameOver = false,
    playerWon = false, 
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());  
  playerScore = calculateScore(playerCards);
  if (playerScore > 21) {
    showStatus();
    endGame();
  }
  showStatus();
});

stayButton.addEventListener('click', function() { 
  let dealerAceScore = dealerScore;
  if (hasAce(dealerCards)) {
    dealerAceScore = dealerScore + 10;
  }
  while (dealerScore <= 16 && dealerAceScore <=16) {
      dealerCards.push(getNextCard());
      dealerScore = calculateScore(dealerCards);
  }
  showStatus();
  endGame();
});

hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGameButton.addEventListener('click', function() { 
  gameStarted = 'true';
  gameOver = 'false';
  playerWon = 'false';
  
  deck = createDeck();
  deck = shuffleDeck(deck);
  playerCards = [getNextCard(), getNextCard()];
  dealerCards = [getNextCard(), getNextCard()];

  textArea.innerText = 'Game Started!';
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();  
});

//Skapa en kortlek 
function createDeck() { 
  let deck = []; 
  for (let suitsIdx=0; suitsIdx<suits.length; suitsIdx++) {
    for (let valuesIdx=0; valuesIdx<values.length; valuesIdx++) {
      let card = {  
        value: values[valuesIdx],
        suit: suits[suitsIdx]
      };
      deck.push( card );
    }
  }
  return deck;
}

//Blanda en kortlek
function shuffleDeck(deck) {
  let i=0;
  for (i=0; i<1000; i++) {
    let tempCardIndex = Math.floor(Math.random() * 52);
    let tempCard = deck[tempCardIndex];
    let tempCardIndex2 = Math.floor(Math.random() * 52);
    let tempCard2 = deck[tempCardIndex2];
    deck[tempCardIndex] = tempCard2;
    deck[tempCardIndex2] = tempCard;
  }
  return deck;
}

//Ta reda på kort i strängform
function getCardString(card) {
  return card.value + ' of ' + card.suit; 
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9; 
    default:
      return 10;
  }
}
    
//plocka ut och returnera första kortet i högen
function getNextCard() {
  return deck.shift(); 
}

//visa status på respektive hand samt spelets status
function showStatus() {
  if(!gameStarted) {
    textArea.innerText = 'Welcome to BlackJack!'; 
    return;
  }
  textArea.innerText = '\n \n Player has: ';
  for (let i=0; i<playerCards.length; i++) {
    playerScore = calculateScore(playerCards);
    textArea.innerText += '\n' + getCardString(playerCards[i]); 
  }
  textArea.innerText += '\n Player Score: ' + calculateScore(playerCards);
  textArea.innerText += '\n \n Dealer has:';
  for (let i=0; i<dealerCards.length; i++) {
    dealerScore = calculateScore(dealerCards); 
    textArea.innerText += '\n' + getCardString(dealerCards[i]); 
  }
  textArea.innerText += '\n Dealer Score: ' + calculateScore(dealerCards);
  return;
}

function calculateScore(cards) {
  let score = 0;
  for (let i=0; i<cards.length; i++) {
    score = score + getCardNumericValue(cards[i]);
  }
  return score;
}

function hasAce(cards) {
  for (let i=0; i<cards.length; i++) {
    if (cards[i] == 'Ace') {
      return true;  
    }
  }
  return false;
}

function endGame() {
  newGameButton.style.display = 'inline';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  if (dealerScore > 21) { 
    textArea.innerText += '\n \n You won the game!!!';
  }      
  else if (playerScore > 21) { 
    textArea.innerText += '\n \n You lost the game!!!';
  }      
  else if (dealerScore > playerScore) {
    textArea.innerText += '\n \n You lost the game!!!';
  }
  else if (playerScore > dealerScore) {
    textArea.innerText += '\n \n You won the game!!!';
  }
  else if (playerScore === dealerScore) {
    textArea.innerText += '\n \n It\'s a tie!!!';
  }
  return;
}

