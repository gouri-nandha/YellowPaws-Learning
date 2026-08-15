const questionElement = document.getElementById("question");
const resultMessage = document.getElementById("result");
const starDisplay = document.getElementById("starDisplay");

let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || { stars: 0, quizCount: 0 };
let stars = profile.stars || 0;
let readAloudOn = localStorage.getItem("readAloudOn") === "true"; // Defaults to false

if (starDisplay) {
    starDisplay.textContent = stars;
}

const quizData = [
    {
        question: "Which letter is for Apple?",
        answers: ["A", "B", "C"],
        correct: "A"
    },
    {
        question: "Which animal says Woof?",
        answers: ["Dog", "Cat", "Lion"],
        correct: "Dog"
    },
    {
        question: "What comes after 4?",
        answers: ["5", "6", "3"],
        correct: "5"
    },
    {
        question: "Which color is the sky?",
        answers: ["Blue", "Red", "Green"],
        correct: "Blue"
    },
    {
        question: "Which shape has 3 corners?",
        answers: ["Triangle", "Circle", "Square"],
        correct: "Triangle"
    },
    {
        question: "Which animal is the biggest?",
        answers: ["Elephant", "Rabbit", "Cat"],
        correct: "Elephant"
    },
    {
        question: "What does a cat say?",
        answers: ["Meow", "Woof", "Roar"],
        correct: "Meow"
    }
];

let currentQuestion = 0;
let score = 0;

function updateReadAloudUI() {
    const btn = document.getElementById("readAloudToggleBtn");
    if (btn) {
        btn.textContent = `Read Aloud: ${readAloudOn ? "On" : "Off"}`;
    }
}

function toggleReadAloud() {
    readAloudOn = !readAloudOn;
    localStorage.setItem("readAloudOn", readAloudOn);
    updateReadAloudUI();
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

function speakCurrentQuestion() {
    if (currentQuestion < quizData.length) {
        speak(quizData[currentQuestion].question);
    }
}

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        finishQuiz();
        return;
    }

    if (resultMessage) resultMessage.textContent = "";

    const q = quizData[currentQuestion];
    if (questionElement) questionElement.textContent = q.question;

    // Only speak automatically if Read Aloud setting was explicitly turned ON by user
    if (readAloudOn) {
        speak(q.question);
    }

    const answersDiv = document.getElementById("answers");
    if (!answersDiv) return;

    answersDiv.innerHTML = "";

    q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.style.fontSize = "1.2rem";
        button.style.padding = "15px";
        button.style.margin = "5px 0";
        button.textContent = answer;

        button.onclick = () => checkAnswer(answer, button);

        answersDiv.appendChild(button);
    });

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.style.display = "inline-block";
}

function checkAnswer(selected, selectedBtn) {
    const q = quizData[currentQuestion];
    const result = document.getElementById("result");

    const allButtons = document.querySelectorAll(".answer-btn");
    allButtons.forEach(btn => btn.disabled = true);

    if (selected === q.correct) {
        if (result) {
            result.textContent = "Correct! +5 Stars!";
            result.style.color = "#2b9348";
        }
        selectedBtn.style.backgroundColor = "#A7F3A1";
        selectedBtn.style.borderColor = "#2b9348";
        score += 5;
        if (readAloudOn) speak("Correct! Great job!");
    } else {
        if (result) {
            result.textContent = `Oops! Correct answer was: ${q.correct}`;
            result.style.color = "#e63946";
        }
        selectedBtn.style.backgroundColor = "#ffb7b2";
        selectedBtn.style.borderColor = "#e63946";
        if (readAloudOn) speak(`Oops! The correct answer was ${q.correct}`);
    }
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function finishQuiz() {
    let currentProf = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || { stars: 0, quizCount: 0 };
    const updatedStars = (currentProf.stars || 0) + score;
    const updatedQuizCount = (currentProf.quizCount || 0) + 1;

    if (window.YellowPawsStorage) {
        window.YellowPawsStorage.updateProfile({ stars: updatedStars, quizCount: updatedQuizCount });
    } else {
        currentProf.stars = updatedStars;
        currentProf.quizCount = updatedQuizCount;
        localStorage.setItem("yellowPawsProfile", JSON.stringify(currentProf));
    }

    if (starDisplay) {
        starDisplay.textContent = updatedStars;
    }

    const quizCard = document.querySelector(".quiz-card");
    if (quizCard) {
        quizCard.innerHTML = `
            <h2>Quiz Complete!</h2>
            <p style="font-size:1.4rem; margin:15px 0;">You earned <strong>${score} Stars</strong>!</p>
            <h3>Keep up the awesome learning!</h3>
        `;
    }

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.style.display = "none";

    if (readAloudOn) speak(`Quiz complete! You earned ${score} stars!`);
}

document.addEventListener("DOMContentLoaded", () => {
    updateReadAloudUI();
    loadQuestion();
});
