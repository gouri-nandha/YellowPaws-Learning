const messages = [
    "Woof! Ready for a fun learning adventure?",
    "Let's learn something amazing today!",
    "You can earn lots of stars!",
    "Learning is fun with YellowPaws!"
];

const messageElement =
document.getElementById("welcomeMessage");

setInterval(() => {

    const random =
    Math.floor(Math.random() * messages.length);

    messageElement.textContent =
    messages[random];

}, 3000);

function startLearning() {

    window.location.href =
    "profile.html";

}

let musicOn = localStorage.getItem("musicOn") === "true";

// Initialize UI
window.addEventListener("DOMContentLoaded", () => {
    const musicBtn = document.getElementById("musicBtn");
    if (musicBtn) {
        musicBtn.textContent = musicOn ? "🎵 Music: On" : "🎵 Music: Off";
    }
    applyTheme();
});

function applyTheme(){
    const theme = localStorage.getItem("selectedTheme");
    if (!theme) return;

    switch(theme){
        case "jungle":
            document.body.style.backgroundColor = "#A7F3A1";
            break;
        case "space":
            document.body.style.backgroundColor = "#B8C0FF";
            break;
        case "ocean":
            document.body.style.backgroundColor = "#9EE7FF";
            break;
        case "fantasy":
            document.body.style.backgroundColor = "#FFD6EC";
            break;
        case "rainbow":
            document.body.style.backgroundColor = "#FFF0A6";
            break;
    }
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

function toggleMusic() {
    musicOn = !musicOn;
    localStorage.setItem("musicOn", musicOn);
    const musicBtn = document.getElementById("musicBtn");
    if (musicBtn) {
        musicBtn.textContent = musicOn ? "🎵 Music: On" : "🎵 Music: Off";
    }
}

function parentArea() {

    window.location.href =
    "parent.html";

}