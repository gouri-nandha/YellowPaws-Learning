const numberData = [
    { num: 1, text: "One" },
    { num: 2, text: "Two" },
    { num: 3, text: "Three" },
    { num: 4, text: "Four" },
    { num: 5, text: "Five" },
    { num: 6, text: "Six" },
    { num: 7, text: "Seven" },
    { num: 8, text: "Eight" },
    { num: 9, text: "Nine" },
    { num: 10, text: "Ten" },
    { num: 11, text: "Eleven" },
    { num: 12, text: "Twelve" },
    { num: 13, text: "Thirteen" },
    { num: 14, text: "Fourteen" },
    { num: 15, text: "Fifteen" },
    { num: 16, text: "Sixteen" },
    { num: 17, text: "Seventeen" },
    { num: 18, text: "Eighteen" },
    { num: 19, text: "Nineteen" },
    { num: 20, text: "Twenty" }
];

let currentNumber = 0;

function updateNumber() {
    document.getElementById("number").textContent = numberData[currentNumber].num;
    document.getElementById("numberText").textContent = numberData[currentNumber].text;

    let dots = "";
    for (let i = 0; i < numberData[currentNumber].num; i++) {
        dots += "[o] ";
    }

    document.getElementById("objects").textContent = dots.trim();
}

function nextNumber() {
    currentNumber++;
    if (currentNumber >= numberData.length) {
        currentNumber = 0;
    }
    updateNumber();
}

function previousNumber() {
    currentNumber--;
    if (currentNumber < 0) {
        currentNumber = numberData.length - 1;
    }
    updateNumber();
}

function speakNumber() {
    let speech = new SpeechSynthesisUtterance(numberData[currentNumber].text);
    speechSynthesis.speak(speech);
}

function testPronunciation() {
    const expectedWord = numberData[currentNumber].text;
    const objectsElement = document.getElementById("objects");
    
    listenToPronunciation(expectedWord, (isCorrect, spokenWord) => {
        if (objectsElement) objectsElement.classList.remove("mascot-happy", "mascot-sad");
        
        if (isCorrect) {
            if (objectsElement) objectsElement.classList.add("mascot-happy");
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
            if (objectsElement) objectsElement.classList.add("mascot-sad");
            alert(`Oops! We heard "${spokenWord}". Try again to say "${expectedWord}"!`);
        }
    });
}

updateNumber();