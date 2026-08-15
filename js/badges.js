function goBack() {
    window.location.href = "learninghub.html";
}
const badgeData = [
    {
        title: "First Quiz",
        tag: "[Quiz Star]",
        stars: 5
    },
    {
        title: "Rising Learner",
        tag: "[Rising Star]",
        stars: 25
    },
    {
        title: "Super Student",
        tag: "[Super Student]",
        stars: 50
    },
    {
        title: "Learning Champion",
        tag: "[Champion]",
        stars: 100
    },
    {
        title: "YellowPaws Hero",
        tag: "[Hero]",
        stars: 200
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile"));
    const totalStars = profile?.stars || 0;
    const grid = document.getElementById("badgesGrid");

    if (grid) {
        grid.innerHTML = "";
        badgeData.forEach(badge => {
            const unlocked = totalStars >= badge.stars;

            const card = document.createElement("div");
            card.className = unlocked ? "badge-card unlocked" : "badge-card locked";

            card.innerHTML = `
                <div class="badge-emoji" style="font-size:1.5rem; font-weight:bold; color:#FFB703;">
                    ${unlocked ? badge.tag : "[Locked]"}
                </div>
                <h3 style="margin:8px 0;">${badge.title}</h3>
                <p style="font-size:1rem; color:#666;">
                    ${badge.stars} Stars Required
                </p>
            `;

            grid.appendChild(card);
        });
    }
});
