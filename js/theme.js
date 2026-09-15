function applyActiveTheme() {
    const theme = "rainbow";
    localStorage.setItem("selectedTheme", "rainbow");
    document.body.classList.remove("theme-jungle", "theme-space", "theme-ocean", "theme-fantasy");
    document.body.classList.add("theme-rainbow");

    const display = document.getElementById("selectedTheme");
    if (display) {
        display.textContent = "Active Theme: Rainbow Meadow Area";
    }
}

function selectTheme(theme = "rainbow") {
    localStorage.setItem("selectedTheme", "rainbow");
    applyActiveTheme();
    
    if ('speechSynthesis' in window && localStorage.getItem("soundOn") !== "false") {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance("Rainbow Meadow theme selected!");
        window.speechSynthesis.speak(speech);
    }
}

function goHome() {
    window.location.href = "learninghub.html";
}

document.addEventListener("DOMContentLoaded", applyActiveTheme);
