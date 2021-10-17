var startButoon = document.getElementById("start");
var quiz = document.getElementById("QuizBody");
var quizContainer = document.getElementById("quiz");
var optionsContainer = document.getElementById("options");
var buttons = document.querySelector(".options-container");
var answer = document.getElementById("answer");
var counter = document.getElementById("counter");
var results = document.getElementById("results");
var gameResults = document.getElementById("gameResults");
var submit = document.getElementById("submit");
var playerName = document.getElementById("name");
var finalResults = document.getElementById("final-results");
var playAgain = document.getElementById("play-again");

// creating list of questions with choices
var Questions = [
  {
    Question: "Inside which HTML element do we put the JavaScript?",
    Options: {
      0: "<scripting>",
      1: "<javascript>",
      2: "<script>",
      3: "<js>",
    },
    correct: "<script>",
  },
  {
    Question: "Where is the correct place to insert a JavaScript?",
    Options: {
      0: "<head> section",
      1: "<body> section",
      2: "<main> section",
      3: "<aside> section",
    },
    correct: "<body> section",
  },
  {
    Question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    Options: {
      0: "<script name= 'xxx.js'>",
      1: "<script href= 'xxx.js'>",
      2: "<script src= 'xxx.js'>",
      3: "<script img= 'xxx.js'>",
    },
    correct: "<script src= 'xxx.js'>",
  },
  {
    Question: "How do you write 'Hello World' in an alert box??",
    Options: {
      0: "msg('Hello World')",
      1: "alertBox('Hello World')",
      2: "alert('Hello World')",
      3: "msgBox('Hello World')",
    },
    correct: "alert('Hello World')",
  },
];

// Game constants
var INCORRECT_ANSWER_PENTALTY = 10;
var CORRECT_ANSWER_POINTS = 10;
var questionsCount = Questions.length;
var currentQuestion = 0;
var score = 0;
console.log(score);

// function to render questions one by one
function showNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questionsCount) {
    var quest = Questions[currentQuestion];
    quizContainer.textContent = quest.Question;
    var i = 0;
    for (i; i < Questions.length; i++) {
      document.getElementById("btn" + i).textContent = quest.Options[i];
    }
  }
}

// function to start quiz and render 1st question
startButoon.addEventListener("click", function addQuestions() {
  quizContainer.textContent = Questions[0].Question;
  var i = 0;
  for (i; i < questionsCount; i++) {
    document.getElementById("btn" + i).textContent = Questions[0].Options[i];
  }
  GameTimer();
  countdownTimer = setInterval(GameTimer, 1000);
});

// function to end quiz
quiz.isEnded = function () {
  return currentQuestion >= questionsCount - 1;
};

// rendering questions after button click
buttons.addEventListener("click", function (event) {
  if (event.target.textContent === Questions[currentQuestion].correct) {
    // Right answer is guessed
    seconds += CORRECT_ANSWER_POINTS;
    score++;
    answer.textContent = "Answer is correct";
    localStorage.setItem("myscore", score);
  } else {
    // Answer is incorrect
    seconds -= INCORRECT_ANSWER_PENTALTY;
    answer.textContent = "Answer is wrong";
    localStorage.setItem("myscore", score);
  }

  if (quiz.isEnded() || finalCountdown) {
    endTheGame();
  } else {
    showNextQuestion();
  }
  console.log(score);
});

//Timer
var isWaiting = false;
var isRunning = false;
var seconds = 20;
var countdownTimer;
var finalCountdown = false;

function GameTimer() {
  var minutes = Math.round((seconds - 30) / 60);
  var remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  document.getElementById("waiting_time").innerHTML =
    "Time left to answer " + minutes + ":" + remainingSeconds;
  if (seconds <= 0) {
    isRunning = true;
    clearInterval(countdownTimer); // Clear the interval to stop the loop
    endTheGame();
  } else {
    isWaiting = true;
    seconds--;
  }
}

// function to show score
function endTheGame() {
  results.style.display = "inline";
  quiz.style.display = "none";
  counter.textContent = "Your final score is " + score;
}

// function to save initials and score

submit.addEventListener("click", function () {
  var plName = playerName.value;
  localStorage.setItem("Player Name", plName);
  results.style.display = "none";
  finalResults.style.display = "inline";
  document.getElementById("show-results").textContent =
    "Hey " +
    localStorage.getItem("Player Name") +
    " your score is " +
    ":" +
    localStorage.getItem("myscore");
});

// Play again

playAgain.addEventListener("click", function () {
  location.reload();
});
