$(document).ready(function() {

  const topRight = document.getElementById('topRight');
  const bottomRight = document.getElementById('bottomRight');
  const bottomLeft = document.getElementById('bottomLeft');
  const topLeft = document.getElementById('topLeft');
  const countButton = document.querySelector('#count');
  const startButton = document.querySelector('#start');
  const strictButton = document.querySelector('#strict');
  const onButton = document.querySelector('#on');
  const sound1 = document.getElementById('sound1');
  const sound2 = document.getElementById('sound2');
  const sound3 = document.getElementById('sound3');
  const sound4 = document.getElementById('sound4');

  //game namespace/scope
  let game = {
    strict: false,
    on: false,
    level: 0,
    gameSequence: [],
    playerSequence: [],
    flash: 0,
    computerRound: false,
    mute: false,
    win: false,

    init: function() {
      topRight.addEventListener('click', game.topRightSelection);
      topLeft.addEventListener('click', game.topLeftSelection);
      bottomRight.addEventListener('click', game.bottomRightSelection);
      bottomLeft.addEventListener('click', game.bottomLeftSelection);
      strictButton.addEventListener('click', game.strictButtonSelection);
      onButton.addEventListener('click', game.onButtonSelection);
      startButton.addEventListener('click', game.startButtonSelection);

      console.log("game.on: " + game.on);
      console.log("game.level: " + game.level);
    },

    // Event listener onButton selection
    onButtonSelection: function() {
      if (onButton.checked === true) {
        game.on = true;
        countButton.innerHTML = "0";
        console.log("game.on: " + game.on);
      } else {
        game.on = false;
        countButton.innerHTML = "";
        game.clearColor();
        clearInterval(intervalId);
      }
    },

    // Event listener strictButton selection
    strictButtonSelection: function() {
      if (strictButton.checked === true) {
        game.strict = true;
      } else {
        game.strict = false;
      }
    },

    // Event listener startButton selection
    startButtonSelection: function() {
      if (game.on === true) {
        game.play();
      }
    },

    // The game starts
    play: function() {
      game.resetGame();
      game.level++;
      countButton.innerHTML = game.level;
      game.flash = 0;
      game.win = false;

      for (let i = 0; i < 20; i++) {
        random = Math.floor(Math.random() * 4) + 1
        game.gameSequence.push(random);
      }

      game.computerRound = true;
      intervalId = setInterval(game.gameRound, 1000);
      console.log("game.gameSequence: " + game.gameSequence);
      console.log("game.level: " + game.level);
    },

    // Reset the game
    resetGame: function() {
      game.gameSequence = [];
      game.playerSeq = [];
      game.level = 0;
    },

    // Instructions if computer round or player round
    gameRound: function() {
      console.log("game.flash: " + game.flash);
      console.log("game.level: " + game.level);

      game.on = false;
      if (game.flash === game.level){
        clearInterval(intervalId);
        game.computerRound = false;
        game.clearColor();
        game.on = true;
        console.log("game.computerRound :" + game.computerRound);
      }

      if (game.computerRound){
        setTimeout( () => {
          console.log("game.computerRound :" + game.computerRound);
          if (game.gameSequence[game.flash] === 1) game.one();
          if (game.gameSequence[game.flash] === 2) game.two();
          if (game.gameSequence[game.flash] === 3) game.three();
          if (game.gameSequence[game.flash] === 4) game.four();
          game.flash++;
        }, 200);
      }
    },

      // Light and sound if 1 in the game Sequence
      one: function() {
        if (!game.mute) {
          sound1.play();
        }
        game.mute = false;
        topRight.style.backgroundColor = "lightblue";
      },

      two: function() {
        if (!game.mute) {
          sound2.play();
        }
        game.mute = false;
        bottomRight.style.backgroundColor = "lightyellow";
      },

      three: function() {
        if (!game.mute) {
          sound3.play();
        }
        game.mute = false;
        bottomLeft.style.backgroundColor = "salmon";
      },

      four: function() {
        if (!game.mute) {
          sound4.play();
        }
        game.mute = false;
        topLeft.style.backgroundColor = "lightGreen";
      },

      clearColor: function() {
        topRight.style.backgroundColor = "blue";
        bottomRight.style.backgroundColor = "yellow";
        bottomLeft.style.backgroundColor = "red";
        topLeft.style.backgroundColor = "green";
      },

    }

  game.init();

});
