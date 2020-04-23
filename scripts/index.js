function randNum() {
  return Math.floor(Math.random() * 101);
}

function showPlayAgainButton() {
  // hide display to prevent further input
  $(".user-num-guess").css("display", "none");
  $(".btn").css("display", "none");
  // add play again button
  $(".play-again-button").css("display", "block");
}

function hidePlayAgainButton() {
  // show input forms
  $(".user-num-guess").css("display", "block");
  $(".btn").css("display", "block");
  // hide play again button
  $(".play-again-button").css("display", "none");
}

function guessHighLowOutput(guessIsHigh) {
  if (guessIsHigh) {
    $(".right-container").addClass("fail");
    $(".update-info").text("Your guess is too high!");
    tries--;
    $(".tries").text(tries + " tries left!");
  } else {
    $(".right-container").addClass("fail");
    $(".update-info").text("Your guess is too low!");
    tries--;
    $(".tries").text(tries + " tries left!");
  }
}

// game won, fail, and reset output
function outputToUser(tries, failed, reset) {
  if (!reset) {
    $(".right-container").removeClass("fail");
    $(".right-container").removeClass("success");
    $(".update-info").text("Submit a number to get started!");
    $(".tries").text("Tries left: " + tries);
  } else {
    if (!failed) {
      $(".right-container").removeClass("fail");
      $(".right-container").addClass("success");
      $(".update-info").text("Congrats! You guessed the correct number!");
      var numOfTries = 10 - tries + 1;
      var tryOrTries;
      if (numOfTries === 1) {
        tryOrTries = " try!";
      } else {
        tryOrTries = " tries!";
      }
      $(".tries").text("You got it in " + (10 - tries + 1) + tryOrTries);
    } else {
      $(".right-container").addClass("fail");
      $(".update-info").text("You ran out of tries!");
      $(".tries").text(tries + " tries left!");
    }
  }
}

function gameWon() {
  // show game won output to user
  outputToUser(tries, false, true);
  // show play again button and hide input forms
  showPlayAgainButton();
}

function gameFail() {
  // show game fail output to user
  outputToUser(tries, true, true);
  // show play again button and hide input forms
  showPlayAgainButton();
}

function gameReset() {
  // reset tries
  tries = 10;
  // show game reset output to user
  outputToUser(tries, false, false);
  // change winning number
  winningNum = randNum();
  // hide play again button and show input form
  hidePlayAgainButton();
}

function playGame() {
  var userGuess = $(".user-num-guess")[0].value;
  if (userGuess === "" || userGuess < 0 || userGuess > 100) {
    // valueAsNumber checked against NaN doesn't work
    alert("Invalid entry: choose a number between 0 and 100!");
  } else if (userGuess == winningNum) {
      // take advantage of type cast since userGuess is num
      // tried using valueAsNumber member but doesn't work to catch NaN case
    gameWon();
  } else if (userGuess < winningNum) {
    // userGuess is low; show output
    guessHighLowOutput(false);
  } else {
    // userGuess is high; show output
    guessHighLowOutput(true);
  }

  // if out of tries, then inform user
  if (tries === 0) {
    gameFail();
  }

  // clear input field after user submits a guess
  $(".user-num-guess").val("");
}

// set winning number and tries to 10
var winningNum = randNum();
var tries = 10;

// event listener on submit button
$(".btn").click(function() {
  playGame();
});

// event listener on enter keydown
$(".user-num-guess").keydown(function(event) {
  if(event.keyCode == 13){
    playGame();
  }
});

// event listener for play again button
$(".play-again-button").click(gameReset);

// clear input field when user clicks on it
$(".user-num-guess").focus(function() {
  $(this).val("");
});
