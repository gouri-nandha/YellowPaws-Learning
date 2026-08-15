function applyActiveTheme() {
    const theme = localStorage.getItem("selectedTheme") || "rainbow";
    document.body.classList.remove("theme-jungle", "theme-space", "theme-ocean", "theme-fantasy", "theme-rainbow");
    document.body.classList.add("theme-" + theme);

    const display = document.getElementById("selectedTheme");
    if (display) {
        const areaNames = {
            jungle: "Jungle World Area",
            space: "Deep Space Area",
            ocean: "Ocean Kingdom Area",
            fantasy: "Enchanted Fantasy Area",
            rainbow: "Rainbow Meadow Area"
        };
        display.textContent = `Active Theme: ${areaNames[theme] || theme.toUpperCase()}`;
    }
}

function selectTheme(theme) {
    localStorage.setItem("selectedTheme", theme);
    applyActiveTheme();
    
    if ('speechSynthesis' in window && localStorage.getItem("soundOn") !== "false") {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(`${theme} theme selected!`);
        window.speechSynthesis.speak(speech);
    }
}

function goHome() {
    window.location.href = "learninghub.html";
}

document.addEventListener("DOMContentLoaded", applyActiveTheme);
