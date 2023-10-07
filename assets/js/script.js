// setting my variables
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-quiz");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var viewHighScores = document.getElementById("highscoreh");
var startGameEl = document.getElementById("start");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-btns");
var checkAnswerEl = document.getElementById("check-answer");
var submitButton = document.getElementById("submit-btn");
var clearScoresButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("initials-field");
var restartButton = document.getElementById("restart-btn");
var playerScore = document.getElementById("your-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
// adding questions ill be using
var questions = [
    {
        question: "Which of the following keywords is used to define a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "let", correct: false },
            { text: "function", correct: false },
            { text: "none of the above", correct: false },
        ]
    },
    {
        question: "How do we write a comment in JavaScript?",
        answers: [
            { text: "/**/", correct: false },
            { text: "//", correct: true },
            { text: "#", correct: false },
            { text: "$$", correct: false },
        ]
    },
    {
        question: "Which of the following methods is used to access HTML elements using JavaScript?",
        answers: [
            { text: "getElementbyID", correct: false },
            { text: "getElementbyClass", correct: false },
            { text: "Both A and B", correct: true },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "Which function is used to serialize an object into a JSON string in JavaScript?",
        answers: [
            { text: "stringify()", correct: true },
            { text: "parse()", correct: false },
            { text: "convert()", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
];
var randomQuestions, questionIndex;

//Start button triggers first question and 'next button' to display
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// Countdown timer
function timerDecrease() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
};

// Start quiz
function startGame() {
    timerID = setInterval(timerDecrease, 1000);
    startGameEl.classList.add("hide");
    randomQuestions = questions.sort(() => Math.random() - .5)
    questionIndex = 0
    questionContainerEl.classList.remove("hide");
    timerDecrease();
    setNextQuestion();
};

//Goes to next question
function setNextQuestion() {
    resetState();
    showQuestion(randomQuestions[questionIndex]);
};

//Displays questions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

//defining resetState function
function resetState() {
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};

// Defining selectAnswer function
function selectAnswer(a) {
    var selectedButton = a.target;
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    if (correct) {
        checkAnswerEl.innerHTML = "Correct!";
    } else {
        checkAnswerEl.innerHTML = "Incorrect!";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
         setStatusClass(button, button.dataset.correct)
    })

    if (randomQuestions.lenght > questionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startButton.classList.remove("hide")
        saveScore();
    }
};

// Check and show the correct answer by set the buttons colors
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};


// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

//saves the scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-holder").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;
    }, 1000)
};

//load score from local storage
var loadScores = function () {
    if (!savedScore) {
        return false;
    }

    savedScore = JSON.parse(savedScore);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScore.push(newScore);
    console.log(savedScore)
    savedScore.forEach(score => {
        initialsField.innerText = score.initials
        playerScore.innerText = score.score
    })
};

// show highscores
function showHighScores(initials) {
    document.getElementById("submit-btn").classList.add("hide");
    document.getElementById("highscores").classList.remove("hide");
    document.getElementById("score-holder").classList.add("hide");
    startGameEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }
    var highscoreEl = document.getElementById("highscore");
    highscoreEl.innerHTML = "";

    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highscoreEl.appendChild(div1);
        highscoreEl.appendChild(div2);
    }
    localStorage.setItem("scores", JSON.stringify(scores));
};

// view high scores
viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

//restarts page
restartButton.addEventListener("click", function () {
    window.location.reload();
});

// clears local storage
clearScoresButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});
