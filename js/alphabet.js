const alphabetData = [
    { letter: "A", word: "Apple" },
    { letter: "B", word: "Ball" },
    { letter: "C", word: "Cat" },
    { letter: "D", word: "Dog" },
    { letter: "E", word: "Elephant" },
    { letter: "F", word: "Fish" },
    { letter: "G", word: "Giraffe" },
    { letter: "H", word: "House" },
    { letter: "I", word: "Ice Cream" },
    { letter: "J", word: "Juice" },
    { letter: "K", word: "Kite" },
    { letter: "L", word: "Lion" },
    { letter: "M", word: "Monkey" },
    { letter: "N", word: "Nest" },
    { letter: "O", word: "Owl" },
    { letter: "P", word: "Penguin" },
    { letter: "Q", word: "Queen" },
    { letter: "R", word: "Rabbit" },
    { letter: "S", word: "Sun" },
    { letter: "T", word: "Tree" },
    { letter: "U", word: "Umbrella" },
    { letter: "V", word: "Violin" },
    { letter: "W", word: "Watermelon" },
    { letter: "X", word: "Xylophone" },
    { letter: "Y", word: "Yacht" },
    { letter: "Z", word: "Zebra" }
];

let currentIndex = 0;

function updateAlphabetCard() {
    const item = alphabetData[currentIndex];
    document.getElementById("letter").textContent = item.letter;
    document.getElementById("word").textContent = `${item.letter} for ${item.word}`;
    
    const badgeTag = document.getElementById("badgeTag");
    if (badgeTag) {
        if (window.YellowPawsIcons && window.YellowPawsIcons.alphabet && window.YellowPawsIcons.alphabet[item.letter]) {
            badgeTag.innerHTML = window.YellowPawsIcons.alphabet[item.letter];
        } else {
            badgeTag.innerHTML = `<span style="font-size:1.5rem; font-weight:bold; color:#2c3e50;">${item.word}</span>`;
        }
    }

    if (window.YellowPawsStorage && window.YellowPawsStorage.addHistory) {
        window.YellowPawsStorage.addHistory(`Learned letter ${item.letter} for ${item.word}`);
    }
}

function nextLetter() {
    currentIndex = (currentIndex + 1) % alphabetData.length;
    updateAlphabetCard();
}

function previousLetter() {
    currentIndex = (currentIndex - 1 + alphabetData.length) % alphabetData.length;
    updateAlphabetCard();
}

function speakLetter() {
    const item = alphabetData[currentIndex];
    const text = `${item.letter} for ${item.word}`;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function testPronunciation() {
    const item = alphabetData[currentIndex];
    const expectedWord = item.word;
    const letterElement = document.getElementById("letter");
    
    listenToPronunciation(expectedWord, (isCorrect, spokenWord) => {
        if (letterElement) letterElement.classList.remove("mascot-happy", "mascot-sad");
        
        if (isCorrect) {
            if (letterElement) letterElement.classList.add("mascot-happy");
            alert(`Awesome! You pronounced "${spokenWord}" correctly! +1 Star!`);
            let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
            const newStars = (profile.stars || 0) + 1;
            if (window.YellowPawsStorage) {
                window.YellowPawsStorage.updateProfile({ stars: newStars });
            } else {
                profile.stars = newStars;
                localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
            }
        } else {
            if (letterElement) letterElement.classList.add("mascot-sad");
            alert(`Oops! We heard "${spokenWord}". Try again to say "${expectedWord}"!`);
        }
    });
}

document.addEventListener("DOMContentLoaded", updateAlphabetCard);