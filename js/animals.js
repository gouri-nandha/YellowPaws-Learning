const animals = [
    { name: "Dog", emoji: "🐶", sound: "Woof Woof" },
    { name: "Cat", emoji: "🐱", sound: "Meow Meow" },
    { name: "Lion", emoji: "🦁", sound: "Roar" },
    { name: "Elephant", emoji: "🐘", sound: "Trumpet" },
    { name: "Monkey", emoji: "🐵", sound: "Ooh Ooh Ah Ah" },
    { name: "Tiger", emoji: "🐯", sound: "Grrr" },
    { name: "Rabbit", emoji: "🐰", sound: "Hop Hop" },
    { name: "Zebra", emoji: "🦓", sound: "Neigh" }
];

let currentAnimal = 0;

function updateAnimal() {

    document.getElementById("animalEmoji").textContent =
        animals[currentAnimal].emoji;

    document.getElementById("animalName").textContent =
        animals[currentAnimal].name;
}

function nextAnimal() {

    currentAnimal++;

    if (currentAnimal >= animals.length) {
        currentAnimal = 0;
    }

    updateAnimal();
}

function previousAnimal() {

    currentAnimal--;

    if (currentAnimal < 0) {
        currentAnimal = animals.length - 1;
    }

    updateAnimal();
}

function speakAnimal() {

    const speech =
        new SpeechSynthesisUtterance(
            animals[currentAnimal].name
        );

    speechSynthesis.speak(speech);
}

function testPronunciation() {
    const expectedWord = animals[currentAnimal].name;
    const animalElement = document.getElementById("animalEmoji");
    
    listenToPronunciation(expectedWord, (isCorrect, spokenWord) => {
        if (animalElement) animalElement.classList.remove("mascot-happy", "mascot-sad");
        
        if (isCorrect) {
            if (animalElement) animalElement.classList.add("mascot-happy");
            alert(`🎉 Great job! You said "${spokenWord}" correctly! +1 Star!`);
            let profile = JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
            profile.stars = (profile.stars || 0) + 1;
            localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
        } else {
            if (animalElement) animalElement.classList.add("mascot-sad");
            alert(`Oops! We heard "${spokenWord}". Try again to say "${expectedWord}"!`);
        }
    });
}

function playAnimalSound() {

    const sound =
        new SpeechSynthesisUtterance(
            animals[currentAnimal].sound
        );

    sound.pitch = 1.3;
    sound.rate = 0.9;

    speechSynthesis.speak(sound);
}

updateAnimal();