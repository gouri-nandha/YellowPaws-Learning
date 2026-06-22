const subject =
    localStorage.getItem("currentSubject");

const questionElement =
    document.getElementById("question");

const optionsContainer =
    document.getElementById("optionsContainer");

const resultMessage =
    document.getElementById("resultMessage");

const starDisplay =
    document.getElementById("starDisplay");

let stars =
    Number(localStorage.getItem("stars")) || 0;

starDisplay.textContent = stars;

let answered = false;

const quizData = [
    {
        question: "🍎 Which letter is for Apple?",
        answers: ["A", "B", "C"],
        correct: "A"
    },
    {
        question: "🐶 Which animal says Woof?",
        answers: ["Dog", "Cat", "Lion"],
        correct: "Dog"
    },
    {
        question: "🔢 What comes after 4?",
        answers: ["5", "6", "3"],
        correct: "5"
    },
    {
        question: "🎨 Which color is the sky?",
        answers: ["Blue", "Red", "Green"],
        correct: "Blue"
    },
    {
        question: "⭐ Which shape is a Star?",
        answers: ["⭐", "⚪", "🔺"],
        correct: "⭐"
    }
];

let currentQuestion = 0;
let score = 0;

loadQuestion();

function loadQuestion() {

    if (currentQuestion >= quizData.length) {

        finishQuiz();
        return;
    }

    document.getElementById("result").textContent = "";

    const question = quizData[currentQuestion];

    document.getElementById("question").textContent =
        question.question;

    const answersDiv =
        document.getElementById("answers");

    answersDiv.innerHTML = "";

    question.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.onclick = () => checkAnswer(answer);

        answersDiv.appendChild(button);
    });
}

function checkAnswer(answer) {

    const question =
        quizData[currentQuestion];

    const result =
        document.getElementById("result");

    if (answer === question.correct) {

        result.textContent =
            "🎉 Correct! +5 Stars";

        score += 5;

    } else {

        result.textContent =
            "😢 Try Again!";
    }

    document
        .querySelectorAll(".answer-btn")
        .forEach(btn => btn.disabled = true);
}

function nextQuestion() {

    currentQuestion++;

    loadQuestion();
}

function finishQuiz() {

    let profile =
        JSON.parse(
            localStorage.getItem(
                "yellowPawsProfile"
            )
        );

    if (profile) {

        profile.stars =
            (profile.stars || 0) + score;

        localStorage.setItem(
            "yellowPawsProfile",
            JSON.stringify(profile)
        );
    }

    document.querySelector(".quiz-card").innerHTML = `
        <h2>🎉 Quiz Complete!</h2>
        <p>You earned ${score} Stars!</p>
        <h3>⭐ Great Job!</h3>
    `;

    document.getElementById("nextBtn")
        .style.display = "none";

    alert(
        "🎉 Great Job!\n\nYou earned " +
        score +
        " stars!"
    );
}



