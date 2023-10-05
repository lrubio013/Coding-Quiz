// setting my variables
var timeLeft= 75;
var timerID;
var timerEl= document.getElementById("timer");
var startButton= document.getElementById("start-quiz");
var nextButton= document.getElementById("next-btn");
var questionContainerEl= document.getElementById("question-container");
var viewHighScores= document.getElementById("highscore");
var startGameEl= document.getElementById("start");
var questionEl= document.getElementById("question");
var answerButtonsEl= document.getElementById("answer-btns");
var checkAnswerEl= document.getElementById("check-answer");
var submitButton= document.getElementById("submit-btn");
var clearScoresButton= document.getElementById("clear-btn");
var initials= document.getElementById("initials");
var restartButton= document.getElementById("restart-btn");
var playerScore= document.getElementById("your-score");
var scores= JSON.parse(localStorage.getItem("scores")) || [];
// adding questions ill be using
var questions= [
{
    question:"Which of the following keywords is used to define a variable in JavaScript?",
    answers: [
        {text: "var", correct: true},
        {text: "let", correct: false},
        {text: "function", correct: false},
        {text: "none of the above", correct: false},
    ]
},
{
    question:"How do we write a comment in JavaScript?",
    answers: [
        {text: "/**/", correct: false},
        {text: "//", correct: true},
        {text: "#", correct: false},
        {text: "$$", correct: false},
    ]
},
{
    question:"Which of the following methods is used to access HTML elements using JavaScript?",
    answers: [
        {text: "getElementbyID", correct: false},
        {text: "getElementbyClass", correct: false},
        {text: "Both A and B", correct: true},
        {text: "None of the above", correct: false},
    ]
},
{
    question:"Which function is used to serialize an object into a JSON string in JavaScript?",
    answers: [
        {text: "stringify()", correct: true},
        {text: "parse()", correct: false},
        {text: "convert()", correct: false},
        {text: "None of the above", correct: false},
    ]
},
];




















