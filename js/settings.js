document.addEventListener("DOMContentLoaded", () => {
    // Load existing settings
    const vol = localStorage.getItem("speechVolume") || "1";
    const rate = localStorage.getItem("speechRate") || "1";
    const pitch = localStorage.getItem("speechPitch") || "1.3"; // default cute pitch
    const readAloudDefault = localStorage.getItem("readAloudDefault") === "true";

    document.getElementById("voiceVolume").value = vol;
    document.getElementById("voiceRate").value = rate;
    document.getElementById("voicePitch").value = pitch;
    document.getElementById("readAloudDefault").checked = readAloudDefault;

    // Add change listeners
    document.getElementById("voiceVolume").addEventListener("input", (e) => {
        localStorage.setItem("speechVolume", e.target.value);
    });
    document.getElementById("voiceRate").addEventListener("input", (e) => {
        localStorage.setItem("speechRate", e.target.value);
    });
    document.getElementById("voicePitch").addEventListener("input", (e) => {
        localStorage.setItem("speechPitch", e.target.value);
    });
    document.getElementById("readAloudDefault").addEventListener("change", (e) => {
        localStorage.setItem("readAloudDefault", e.target.checked);
    });
});

function testSpeechSettings() {
    const vol = parseFloat(localStorage.getItem("speechVolume") || "1");
    const rate = parseFloat(localStorage.getItem("speechRate") || "1");
    const pitch = parseFloat(localStorage.getItem("speechPitch") || "1.3");

    const utterance = new SpeechSynthesisUtterance("Hello! Testing my new cute voice settings!");
    utterance.volume = vol;
    utterance.rate = rate;
    utterance.pitch = pitch;
    speechSynthesis.speak(utterance);
}

function resetApp() {
    if (confirm("Are you sure you want to reset all app settings and history?")) {
        if (window.YellowPawsStorage) {
            window.YellowPawsStorage.logout();
        }
        localStorage.clear();
        alert("App data reset successfully!");
        window.location.href = "index.html";
    }
}
