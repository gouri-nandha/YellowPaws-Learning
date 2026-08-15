const challenges = [
    {
        title: "Quiz Champion",
        description: "Complete 3 quizzes today.",
        reward: 5
    },
    {
        title: "Star Collector",
        description: "Earn 10 stars today.",
        reward: 5
    },
    {
        title: "Learning Explorer",
        description: "Visit all learning sections today.",
        reward: 10
    }
];

const today = new Date().toDateString();
let savedDate = localStorage.getItem("challengeDate");
let challenge;

if (savedDate !== today) {
    challenge = challenges[Math.floor(Math.random() * challenges.length)];
    localStorage.setItem("dailyChallenge", JSON.stringify(challenge));
    localStorage.setItem("challengeDate", today);
    localStorage.setItem("challengeCompleted", "false");
} else {
    challenge = JSON.parse(localStorage.getItem("dailyChallenge")) || challenges[0];
}

document.addEventListener("DOMContentLoaded", () => {
    if (challenge) {
        const titleEl = document.getElementById("challengeTitle");
        if (titleEl) titleEl.textContent = challenge.title;
        
        const descEl = document.getElementById("challengeDescription");
        if (descEl) descEl.textContent = challenge.description;
        
        const rewardEl = document.getElementById("rewardText");
        if (rewardEl) rewardEl.textContent = challenge.reward + " Stars";
    }

    const completed = localStorage.getItem("challengeCompleted");
    if (completed === "true") {
        const statusEl = document.getElementById("challengeStatus");
        if (statusEl) {
            statusEl.textContent = "Challenge already completed today!";
            statusEl.style.color = "#2b9348";
        }
        const btn = document.getElementById("claimButton");
        if (btn) btn.disabled = true;
    }
});

async function claimReward() {
    if (localStorage.getItem("challengeCompleted") === "true") {
        return;
    }

    const rewardStars = challenge ? challenge.reward : 5;
    
    if (window.YellowPawsStorage) {
        await window.YellowPawsStorage.claimReward(rewardStars, today);
    } else {
        let profile = JSON.parse(localStorage.getItem("yellowPawsProfile")) || { stars: 0 };
        profile.stars = (profile.stars || 0) + rewardStars;
        localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
        localStorage.setItem("challengeCompleted", "true");
    }

    const statusEl = document.getElementById("challengeStatus");
    if (statusEl) {
        statusEl.textContent = `Reward Claimed! +${rewardStars} Stars added to your profile!`;
        statusEl.style.color = "#2b9348";
    }
    
    const claimBtn = document.getElementById("claimButton");
    if (claimBtn) claimBtn.disabled = true;
}

function goBack() {
    window.location.href = "learninghub.html";
}
