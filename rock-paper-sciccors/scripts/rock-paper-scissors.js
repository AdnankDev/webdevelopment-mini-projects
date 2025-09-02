const pElement = document.querySelector(".p-tag");
const scoreElement = document.querySelector(".js-score");
const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
scoreElement.innerHTML = `Win: ${score.wins} Loss: ${score.losses} Tie: ${score.ties}`;

function picCopupterMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}

function playGame(playerMove) {
  computerMove = picCopupterMove();
  let result = "";
  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Loose";
    } else if (computerMove === "Paper") {
      result = "You Win ";
    } else if (computerMove === "Scissors") {
      result = "Its Tie";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win";
    } else if (computerMove === "Paper") {
      result = "Its Tie ";
    } else if (computerMove === "Scissors") {
      result = "You Loose";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Its Tie";
    } else if (computerMove === "Paper") {
      result = "You Loose ";
    } else if (computerMove === "Scissors") {
      result = "You Win";
    }
  }

  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Loose") {
    score.losses += 1;
  } else if (result === "Its Tie") {
    score.ties += 1;
  }
  //local storage concept
  localStorage.setItem("score", JSON.stringify(score));
  playerMove = playerMove.toLowerCase();
  computerMove = computerMove.toLowerCase();

  pElement.innerHTML = `${result}
    You <img src="./images/${playerMove}-emoji.png" alt="" class="move-icon" />
   <img src="./images/${computerMove}-emoji.png" alt="" class="move-icon" /> Computer`;

  scoreElement.innerHTML = `win: ${score.wins} Loss:${score.losses} Tie ${score.ties}`;
}

function setScoreZero() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  scoreElement.innerHTML = `win: ${score.wins} Loss:${score.losses} Tie ${score.ties}`;
  pElement.innerHTML = "Choose Your move";
}
let isNotPlaying = false;
let intervalId;
function autoPlay() {
  if (!isNotPlaying) {
    intervalId = setInterval(() => {
      const playerMove = picCopupterMove();
      playGame(playerMove);
      autoBtn.innerHTML = "Stop Auto Play";
    }, 2000);
    isNotPlaying = true;
  } else {
    autoBtn.removeEventListener("click", () => {
      autoPlay();
    });
    autoBtn.innerHTML = "Auto Play";
    clearInterval(intervalId);
    isNotPlaying = false;
  }
}

document.body.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "r") {
    playGame("Rock");
  } else if (key === "p") {
    playGame("Paper");
  } else if (key === "s") {
    playGame("Scissors");
  }
});

const autoBtn = document.querySelector(".auto-play-btn");
autoBtn.addEventListener("click", () => {
  autoPlay();
});
