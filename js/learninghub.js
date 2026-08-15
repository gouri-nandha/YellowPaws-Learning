document.addEventListener("DOMContentLoaded", () => {
    // Get profile data using YellowPawsStorage or localStorage fallback
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile"));

    // Redirect if profile doesn't exist
    if (!profile) {
        window.location.href = "profile.html";
        return;
    }

    // Display avatar graphic using clean SVG asset path
    const avatarContainer = document.getElementById("avatarContainer");
    if (avatarContainer) {
        const avName = profile.avatar || "Puppy";
        const avFileMap = {
            Puppy: "assets/avatars/puppy.svg",
            Kitten: "assets/avatars/kitten.svg",
            "Lion Cub": "assets/avatars/lion.svg",
            Bunny: "assets/avatars/bunny.svg"
        };
        const avatarSrc = avFileMap[avName] || "assets/avatars/puppy.svg";
        avatarContainer.innerHTML = `<img src="${avatarSrc}" style="width:65px; height:65px; object-fit:contain; border-radius:50%; border:3px solid #FFD93D;" alt="${avName}">`;
    }

    // Display nickname
    const nicknameElement = document.getElementById("nickname");
    if (nicknameElement) {
        nicknameElement.textContent = profile.nickname || profile.username || "Friend";
    }

    // STREAKS & DAILY REWARDS
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem("lastLoginDate");
    let streak = Number(localStorage.getItem("learningStreak")) || profile.streak || 1;

    if (lastLogin !== today) {
        // New day login
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastLogin === yesterday.toDateString()) {
            streak += 1;
        } else {
            streak = 1; // Reset streak
        }
        
        localStorage.setItem("learningStreak", streak);
        localStorage.setItem("lastLoginDate", today);
        
        // Daily Rewards Logic
        let reward = 0;
        let rewardMsg = "";
        if (streak === 1) { reward = 5; rewardMsg = "Day 1 Reward: +5 Stars!"; }
        else if (streak === 2) { reward = 10; rewardMsg = "Day 2 Reward: +10 Stars!"; }
        else if (streak === 5) { reward = 20; rewardMsg = "5 Day Streak! +20 Stars!"; }
        else if (streak >= 3) { rewardMsg = "Great job keeping up the streak!"; }
        
        if (reward > 0) {
            profile.stars = (profile.stars || 0) + reward;
            profile.streak = streak;
            if (window.YellowPawsStorage) {
                window.YellowPawsStorage.updateProfile({ stars: profile.stars, streak: streak });
            } else {
                localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
            }
        }
        
        if (rewardMsg) {
            alert("Daily Reward: " + rewardMsg);
        }
    }

    const streakElement = document.getElementById("streakCount");
    if (streakElement) {
        streakElement.textContent = streak;
    }

    // Display stars
    const starsElement = document.getElementById("stars");
    if (starsElement) {
        starsElement.textContent = profile.stars || 0;
    }

    // Calculate rank
    let rank = "Beginner";

    if ((profile.stars ?? 0) >= 200) {
        rank = "YellowPaws Hero";
    }
    else if ((profile.stars ?? 0) >= 100) {
        rank = "Learning Champion";
    }
    else if ((profile.stars ?? 0) >= 50) {
        rank = "Super Student";
    }
    else if ((profile.stars ?? 0) >= 25) {
        rank = "Rising Learner";
    }
    else if ((profile.stars ?? 0) >= 5) {
        rank = "First Quiz Star";
    }

    // Display rank
    const rankElement = document.getElementById("rankTitle");
    if (rankElement) {
        rankElement.textContent = rank;
    }

    // Daily challenge progress
    const challengeElement = document.getElementById("dailyChallenge");

    if (challengeElement) {
        if ((profile.stars ?? 0) < 25) {
            challengeElement.textContent = "Daily Challenge: Earn 25 Stars";
        }
        else if ((profile.stars ?? 0) < 50) {
            challengeElement.textContent = "Daily Challenge: Reach 50 Stars";
        }
        else if ((profile.stars ?? 0) < 100) {
            challengeElement.textContent = "Daily Challenge: Reach 100 Stars";
        }
        else {
            challengeElement.textContent = "Amazing! Keep Learning!";
        }
    }
});

// Logout function
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        if (window.YellowPawsStorage) {
            window.YellowPawsStorage.logout();
        } else {
            localStorage.removeItem("yellowPawsProfile");
        }
        window.location.href = "index.html";
    }
}