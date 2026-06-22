const profile =
    JSON.parse(
        localStorage.getItem(
            "yellowPawsProfile"
        )
    );

if (!profile) {
    window.location.href = "profile.html";
}

const stars =
    profile.stars || 0;

document.getElementById("childName")
    .textContent =
    profile.nickname;

document.getElementById("starCount")
    .textContent =
    stars;

let title = "Learning Explorer";

if (stars >= 200) {
    title = "👑 YellowPaws Hero";
}
else if (stars >= 100) {
    title = "🎓 Learning Champion";
}
else if (stars >= 50) {
    title = "🏆 Super Student";
}
else if (stars >= 25) {
    title = "⭐ Rising Learner";
}
else if (stars >= 5) {
    title = "🌟 First Quiz Star";
}

document.getElementById("certificateTitle")
    .textContent = title;

const today = new Date();

document.getElementById("certificateDate")
    .textContent =
    "Awarded on: " +
    today.toLocaleDateString();