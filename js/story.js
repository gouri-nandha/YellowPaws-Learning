const storyData = {
    title: "YellowPaws Goes to School",
    pages: [
        { text: "Once upon a time, a little dog named YellowPaws woke up very early. Today was his first day of school!", emoji: "🐶" },
        { text: "He packed his yellow backpack with a shiny red apple and two pencils.", emoji: "🎒" },
        { text: "At school, he met a new friend, a fluffy cat named Whiskers.", emoji: "🐱" },
        { text: "They learned to count to 10 and sing the ABCs together.", emoji: "🔢" },
        { text: "YellowPaws was so happy. Learning is the best adventure!", emoji: "🌟" }
    ]
};

let currentPage = 0;

function loadPage() {
    document.getElementById("storyTitle").textContent = storyData.title;
    document.getElementById("storyText").textContent = storyData.pages[currentPage].text;
    document.getElementById("storyImage").textContent = storyData.pages[currentPage].emoji;
}

function nextPage() {
    currentPage++;
    if (currentPage >= storyData.pages.length) {
        alert("🎉 You finished the story! +5 Stars!");
        let profile = JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
        profile.stars = (profile.stars || 0) + 5;
        localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
        
        window.location.href = "learninghub.html";
        return;
    }
    loadPage();
}

function readAloud() {
    const text = storyData.pages[currentPage].text;
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

document.addEventListener("DOMContentLoaded", loadPage);
