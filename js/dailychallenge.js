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

if(savedDate !== today){
    challenge = challenges[Math.floor(Math.random() * challenges.length)];
    localStorage.setItem("dailyChallenge", JSON.stringify(challenge));
    localStorage.setItem("challengeDate", today);
    localStorage.setItem("challengeCompleted", "false");
} else {
    challenge = JSON.parse(localStorage.getItem("dailyChallenge"));
}

document.getElementById("challengeTitle").textContent = challenge.title;
document.getElementById("challengeDescription").textContent = challenge.description;
document.getElementById("rewardText").textContent = challenge.reward + " ⭐";

const completed = localStorage.getItem("challengeCompleted");
if(completed === "true"){
    document.getElementById("challengeStatus").textContent = "✅ Challenge already completed today";
    document.getElementById("claimButton").disabled = true;
}

function claimReward(){
    if(localStorage.getItem("challengeCompleted") === "true"){
        return;
    }
    let stars = Number(localStorage.getItem("stars")) || 0;
    stars += challenge.reward;
    localStorage.setItem("stars", stars);
    localStorage.setItem("challengeCompleted", "true");
    document.getElementById("challengeStatus").textContent = "🎉 Reward Claimed!";
    document.getElementById("claimButton").disabled = true;
}

function goBack(){
    window.location.href = "learninghub.html";
}
