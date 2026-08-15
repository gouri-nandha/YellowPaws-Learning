const alphabetData = [
    { letter: "A", word: "Apple" },
    { letter: "B", word: "Ball" },
    { letter: "C", word: "Cat" },
    { letter: "D", word: "Dog" },
    { letter: "E", word: "Elephant" },
    { letter: "F", word: "Fish" },
    { letter: "G", word: "Grapes" },
    { letter: "H", word: "Hat" },
    { letter: "I", word: "Ice Cream" },
    { letter: "J", word: "Juice" },
    { letter: "K", word: "Kite" },
    { letter: "L", word: "Lion" },
    { letter: "M", word: "Monkey" },
    { letter: "N", word: "Nest" },
    { letter: "O", word: "Orange" },
    { letter: "P", word: "Parrot" },
    { letter: "Q", word: "Queen" },
    { letter: "R", word: "Rabbit" },
    { letter: "S", word: "Sun" },
    { letter: "T", word: "Tiger" },
    { letter: "U", word: "Umbrella" },
    { letter: "V", word: "Van" },
    { letter: "W", word: "Watermelon" },
    { letter: "X", word: "Xylophone" },
    { letter: "Y", word: "Yak" },
    { letter: "Z", word: "Zebra" }
];

let currentIndex = 0;

function updateAlphabet() {
    document.getElementById("letter").textContent = alphabetData[currentIndex].letter;

    const badge = document.getElementById("badgeTag");
    if (badge) {
        badge.textContent = `[${alphabetData[currentIndex].word}]`;
    }

    document.getElementById("word").textContent =
        alphabetData[currentIndex].letter + " for " + alphabetData[currentIndex].word;
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
    const badgeElement = document.getElementById("badgeTag");
    
    listenToPronunciation(expectedWord, (isCorrect, spokenWord) => {
        if (badgeElement) badgeElement.classList.remove("mascot-happy", "mascot-sad");
        
        if (isCorrect) {
            if (badgeElement) badgeElement.classList.add("mascot-happy");
            alert(`Great job! You said "${spokenWord}" correctly! +1 Star!`);
            let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
            const newStars = (profile.stars || 0) + 1;
            if (window.YellowPawsStorage) {
                window.YellowPawsStorage.updateProfile({ stars: newStars });
            } else {
                profile.stars = newStars;
                localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
            }
        } else {
            if (badgeElement) badgeElement.classList.add("mascot-sad");
            alert(`Oops! We heard "${spokenWord}". Try again to say "${expectedWord}"!`);
        }
    });
}

updateAlphabet();