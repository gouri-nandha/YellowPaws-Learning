const animals = [
    { name: "Alligator", sound: "Chomp Chomp" },
    { name: "Bear", sound: "Growl Growl" },
    { name: "Cat", sound: "Meow Meow" },
    { name: "Dog", sound: "Woof Woof" },
    { name: "Elephant", sound: "Trumpet" },
    { name: "Fox", sound: "Yip Yip" },
    { name: "Giraffe", sound: "Hummm" },
    { name: "Hippo", sound: "Grunt Grunt" },
    { name: "Iguana", sound: "Hiss Hiss" },
    { name: "Jellyfish", sound: "Swish Swish" },
    { name: "Kangaroo", sound: "Boing Boing" },
    { name: "Lion", sound: "Roar" },
    { name: "Monkey", sound: "Ooh Ooh Ah Ah" },
    { name: "Newt", sound: "Splash Splash" },
    { name: "Owl", sound: "Hoot Hoot" },
    { name: "Penguin", sound: "Honk Honk" },
    { name: "Quail", sound: "Chirp Chirp" },
    { name: "Rabbit", sound: "Hop Hop" },
    { name: "Sheep", sound: "Baa Baa" },
    { name: "Tiger", sound: "Grrr" },
    { name: "Unicorn", sound: "Neigh Sparkle" },
    { name: "Vulture", sound: "Screech" },
    { name: "Whale", sound: "Sing Sing" },
    { name: "X-ray Fish", sound: "Blub Blub" },
    { name: "Yak", sound: "Grunt" },
    { name: "Zebra", sound: "Neigh" }
];

let currentAnimal = 0;

function updateAnimal() {
    const animal = animals[currentAnimal];
    const container = document.getElementById("animalEmoji");
    if (container) {
        if (window.YellowPawsIcons && window.YellowPawsIcons.animals[animal.name]) {
            container.innerHTML = window.YellowPawsIcons.animals[animal.name];
        } else {
            container.textContent = animal.name;
        }
    }
    document.getElementById("animalName").textContent = animal.name;
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
    const speech = new SpeechSynthesisUtterance(animals[currentAnimal].name);
    speechSynthesis.speak(speech);
}

function testPronunciation() {
    const expectedWord = animals[currentAnimal].name;
    const animalElement = document.getElementById("animalEmoji");
    
    listenToPronunciation(expectedWord, (isCorrect, spokenWord) => {
        if (animalElement) animalElement.classList.remove("mascot-happy", "mascot-sad");
        
        if (isCorrect) {
            if (animalElement) animalElement.classList.add("mascot-happy");
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
            if (animalElement) animalElement.classList.add("mascot-sad");
            alert(`Oops! We heard "${spokenWord}". Try again to say "${expectedWord}"!`);
        }
    });
}

function playAnimalSound() {
    const sound = new SpeechSynthesisUtterance(animals[currentAnimal].sound);
    sound.pitch = 1.3;
    sound.rate = 0.9;
    speechSynthesis.speak(sound);
}

document.addEventListener("DOMContentLoaded", updateAnimal);