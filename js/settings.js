document.addEventListener("DOMContentLoaded", () => {
    updateBtnUI("musicOn", "Music");
    updateBtnUI("soundOn", "Sound Effects");
});

function toggleSetting(key) {
    let current = localStorage.getItem(key) === "true";
    localStorage.setItem(key, !current);
    
    let label = key === "musicOn" ? "Music" : "Sound Effects";
    updateBtnUI(key, label);
}

function updateBtnUI(key, label) {
    let current = localStorage.getItem(key) === "true";
    let btn = document.getElementById("btn-" + key);
    if (btn) {
        btn.textContent = `${label}: ${current ? "On" : "Off"}`;
    }
}

function resetApp() {
    if (confirm("Are you sure you want to reset everything? This will delete the profile and all progress!")) {
        localStorage.clear();
        alert("App has been reset.");
        window.location.href = "index.html";
    }
}
