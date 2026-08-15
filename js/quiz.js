const allQuizPool = [
    { question: "What letter does Apple start with?", options: ["B", "A", "C", "D"], correct: 1 },
    { question: "How many legs does a dog have?", options: ["2", "4", "6", "8"], correct: 1 },
    { question: "What color is a banana?", options: ["Red", "Blue", "Yellow", "Green"], correct: 2 },
    { question: "What shape has 3 sides?", options: ["Square", "Circle", "Triangle", "Star"], correct: 2 },
    { question: "Which animal says 'Meow'?", options: ["Dog", "Cat", "Lion", "Elephant"], correct: 1 },
    { question: "What is the moral of The Tortoise & The Hare?", options: ["Be fast", "Slow and steady wins", "Always sleep", "Never run"], correct: 1 },
    { question: "Which letter comes after B?", options: ["A", "D", "C", "E"], correct: 2 },
    { question: "What shape is a ball?", options: ["Cube", "Circle / Sphere", "Square", "Triangle"], correct: 1 },
    { question: "What color is the sky on a sunny day?", options: ["Green", "Blue", "Yellow", "Purple"], correct: 1 },
    { question: "Which animal is known as the King of the Jungle?", options: ["Tiger", "Monkey", "Lion", "Rabbit"], correct: 2 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "What color do you get when you mix Red and Yellow?", options: ["Green", "Purple", "Orange", "Blue"], correct: 2 },
    { question: "Which letter comes before Z?", options: ["X", "Y", "W", "V"], correct: 1 },
    { question: "What shape has 4 equal sides?", options: ["Rectangle", "Square", "Triangle", "Oval"], correct: 1 },
    { question: "What was the moral of The Honest Woodcutter?", options: ["Honesty is the best policy", "Keep gold", "Never work", "Cut trees"], correct: 0 }
];

let dailyQuestions = [];
let currentQuizIndex = 0;
let score = 0;
let isReadAloudEnabled = false;

function generateDailyQuiz() {
    const dateStr = new Date().toDateString();
    // Simple hash function for date seed
    let seed = 0;
    for (let i = 0; i < dateStr.length; i++) {
        seed = (seed << 5) - seed + dateStr.charCodeAt(i);
        seed |= 0;
    }
    
    // Pick 5 deterministic questions for today
    const poolCopy = [...allQuizPool];
    dailyQuestions = [];
    for (let i = 0; i < 5; i++) {
        const index = Math.abs(seed + i * 7) % poolCopy.length;
        dailyQuestions.push(poolCopy[index]);
        poolCopy.splice(index, 1);
    }
}

function loadQuestion() {
    if (dailyQuestions.length === 0) generateDailyQuiz();

    const q = dailyQuestions[currentQuizIndex];
    document.getElementById("quizProgress").textContent = `Question ${currentQuizIndex + 1} of ${dailyQuestions.length}`;
    document.getElementById("question").textContent = q.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(idx);
        optionsContainer.appendChild(btn);
    });

    if (isReadAloudEnabled) {
        speakQuestion();
    }
}

function toggleReadAloud() {
    isReadAloudEnabled = !isReadAloudEnabled;
    const btn = document.getElementById("readAloudToggleBtn");
    if (btn) {
        btn.textContent = `Read Aloud: ${isReadAloudEnabled ? 'On' : 'Off'}`;
        btn.style.backgroundColor = isReadAloudEnabled ? '#52b788' : '#e0e0e0';
        btn.style.color = isReadAloudEnabled ? '#ffffff' : '#333333';
    }
    if (isReadAloudEnabled) {
        speakQuestion();
    }
}

function speakQuestion() {
    const q = dailyQuestions[currentQuizIndex];
    if (!q) return;
    const text = `${q.question}. Options are: ${q.options.join(", ")}`;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function selectAnswer(selectedIndex) {
    const q = dailyQuestions[currentQuizIndex];
    const optionsContainer = document.getElementById("options");
    const buttons = optionsContainer.querySelectorAll("button");

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correct) {
            btn.style.backgroundColor = "#52b788";
            btn.style.color = "#ffffff";
        } else if (idx === selectedIndex) {
            btn.style.backgroundColor = "#ff4d6d";
            btn.style.color = "#ffffff";
        }
    });

    if (selectedIndex === q.correct) {
        score++;
    }

    setTimeout(() => {
        currentQuizIndex++;
        if (currentQuizIndex < dailyQuestions.length) {
            loadQuestion();
        } else {
            showQuizResults();
        }
    }, 1200);
}

function showQuizResults() {
    document.getElementById("quizCard").style.display = "none";
    const resultCard = document.getElementById("resultCard");
    resultCard.style.display = "block";

    document.getElementById("finalScore").textContent = `${score} / ${dailyQuestions.length}`;
    
    // Add stars
    const earnedStars = score * 2;
    document.getElementById("starsEarned").textContent = `+${earnedStars} Stars!`;

    let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
    const newStars = (profile.stars || 0) + earnedStars;
    const quizCount = (profile.quizCount || profile.quiz_count || 0) + 1;

    if (window.YellowPawsStorage) {
        window.YellowPawsStorage.updateProfile({ stars: newStars, quiz_count: quizCount });
        window.YellowPawsStorage.addHistory(`Completed Daily Quiz (${score}/${dailyQuestions.length})`);
    } else {
        profile.stars = newStars;
        profile.quizCount = quizCount;
        localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
    }
}

function restartQuiz() {
    currentQuizIndex = 0;
    score = 0;
    generateDailyQuiz();
    document.getElementById("quizCard").style.display = "block";
    document.getElementById("resultCard").style.display = "none";
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    generateDailyQuiz();
    loadQuestion();
});
