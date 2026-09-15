const display = document.getElementById("selectedTheme");

function selectTheme(theme = "rainbow"){
    localStorage.setItem("selectedTheme", "rainbow");

    if (display) {
        display.textContent = `Rainbow Meadow theme selected!`;
    }

    document.body.classList.remove("theme-jungle", "theme-space", "theme-ocean", "theme-fantasy");
    document.body.classList.add("theme-rainbow");
}

function initThemes() {
    localStorage.setItem("selectedTheme", "rainbow");
    document.body.classList.remove("theme-jungle", "theme-space", "theme-ocean", "theme-fantasy");
    document.body.classList.add("theme-rainbow");
    if (display) {
        display.textContent = `Active Theme: RAINBOW MEADOW`;
    }
}

document.addEventListener("DOMContentLoaded", initThemes);

function goHome(){
    window.location.href = "index.html";
}