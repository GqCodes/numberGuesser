/**
 GAME FUNCTION
 - Player must guess a number between a min and max
 - Player gets a certain amount of guesses
 - notify player of guesses remaining
 - notify the player of the correct answer if loose
 - let player choose to play again
 */

//  Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//   UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//   Assign UI Min & Max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", (e) => (e.target.className === "play-again" ? window.location.reload() : ""));
// game.addEventListener("mousedown", function (e) {
//   if (e.target.className === "play-again") {
//     window.location.reload();
//   }
// });

// listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //   validate
  //   if (isNaN(guess) || guess < min || guess > max) {
  //     setMessage(`Please enter a number between ${min} and ${max}`);
  //   }
  isNaN(guess) || guess < min || guess > max ? setMessage(`Please enter a number between ${min} and ${max}`, "red") : "";

  //   check if won
  if (guess === winningNum) {
    // Game Over - WOn
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game Over - Lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong
      // change border color
      guessInput.style.borderColor = "red";
      //   clear input
      guessInput.value = "";
      //   Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  //   set text color
  message.style.color = color;
  // set message
  setMessage(msg);
  //   play again??
  guessBtn.value = "play again?";
  guessBtn.className += "play-again";
}

// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get Winning Num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
