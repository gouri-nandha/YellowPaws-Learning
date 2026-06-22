const alphabetData = [
    { letter: "A", word: "Apple", emoji: "🍎" },
    { letter: "B", word: "Ball", emoji: "⚽" },
    { letter: "C", word: "Cat", emoji: "🐱" },
    { letter: "D", word: "Dog", emoji: "🐶" },
    { letter: "E", word: "Elephant", emoji: "🐘" },
    { letter: "F", word: "Fish", emoji: "🐟" },
    { letter: "G", word: "Grapes", emoji: "🍇" },
    { letter: "H", word: "Hat", emoji: "🎩" },
    { letter: "I", word: "Ice Cream", emoji: "🍦" },
    { letter: "J", word: "Juice", emoji: "🧃" },
    { letter: "K", word: "Kite", emoji: "🪁" },
    { letter: "L", word: "Lion", emoji: "🦁" },
    { letter: "M", word: "Monkey", emoji: "🐵" },
    { letter: "N", word: "Nest", emoji: "🪺" },
    { letter: "O", word: "Orange", emoji: "🍊" },
    { letter: "P", word: "Parrot", emoji: "🦜" },
    { letter: "Q", word: "Queen", emoji: "👑" },
    { letter: "R", word: "Rabbit", emoji: "🐰" },
    { letter: "S", word: "Sun", emoji: "☀️" },
    { letter: "T", word: "Tiger", emoji: "🐯" },
    { letter: "U", word: "Umbrella", emoji: "☂️" },
    { letter: "V", word: "Van", emoji: "🚐" },
    { letter: "W", word: "Watermelon", emoji: "🍉" },
    { letter: "X", word: "Xylophone", emoji: "🎼" },
    { letter: "Y", word: "Yak", emoji: "🐂" },
    { letter: "Z", word: "Zebra", emoji: "🦓" }
];

let currentIndex = 0;

function updateAlphabet() {

    document.getElementById("letter").textContent =
        alphabetData[currentIndex].letter;

    document.getElementById("emoji").textContent =
        alphabetData[currentIndex].emoji;

    document.getElementById("word").textContent =
        alphabetData[currentIndex].letter +
        " for " +
        alphabetData[currentIndex].word;
}

function nextLetter() {

    currentIndex++;

    if (currentIndex >= alphabetData.length) {
        currentIndex = 0;
    }

    updateAlphabet();
}

function previousLetter() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = alphabetData.length - 1;
    }

    updateAlphabet();
}

function speakLetter() {
    const text = alphabetData[currentIndex].letter + " for " + alphabetData[currentIndex].word;
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

function testPronunciation() {
    const expectedWord = alphabetData[currentIndex].word;
    const emojiElement = document.getElementById("emoji");
    
    listenToPronunciation(expectedWord, (isCorrect, spokenWord) => {
        emojiElement.classList.remove("mascot-happy", "mascot-sad");
        
        if (isCorrect) {
            emojiElement.classList.add("mascot-happy");
            alert(`🎉 Great job! You said "${spokenWord}" correctly! +1 Star!`);
            let profile = JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
            profile.stars = (profile.stars || 0) + 1;
            localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
        } else {
            emojiElement.classList.add("mascot-sad");
            alert(`Oops! We heard "${spokenWord}". Try again to say "${expectedWord}"!`);
        }
    });
}

updateAlphabet();