const badgeGrid =
    document.getElementById("badgeGrid");

const badges =
    JSON.parse(
        localStorage.getItem("badges")
    ) || [];

if (badges.length === 0) {
    badgeGrid.innerHTML =
        "<h2>No badges earned yet!</h2>";


}
else {

    badges.forEach(badge => {

        const card =
            document.createElement("div");

        card.className =
            "badge-card";

        card.innerHTML =
            `<h2>${badge}</h2>`;

        badgeGrid.appendChild(card);

    });

}

function goBack() {

    window.location.href =
        "learn.html";


}
const badgeData = [
    {
        title: "First Quiz",
        emoji: "🌟",
        stars: 5
    },
    {
        title: "Rising Learner",
        emoji: "⭐",
        stars: 25
    },
    {
        title: "Super Student",
        emoji: "🏆",
        stars: 50
    },
    {
        title: "Learning Champion",
        emoji: "🎓",
        stars: 100
    },
    {
        title: "YellowPaws Hero",
        emoji: "👑",
        stars: 200
    }
];

const profile =
    JSON.parse(
        localStorage.getItem(
            "yellowPawsProfile"
        )
    );

const totalStars =
    profile?.stars || 0;

const grid =
    document.getElementById("badgesGrid");

badgeData.forEach(badge => {

    const unlocked =
        totalStars >= badge.stars;

    const card =
        document.createElement("div");

    card.className =
        unlocked
            ? "badge-card unlocked"
            : "badge-card locked";

    card.innerHTML = `
        <div class="badge-emoji">
            ${unlocked ? badge.emoji : "🔒"}
        </div>

        <h3>${badge.title}</h3>

        <p>
            ${badge.stars} Stars Required
        </p>
    `;

    grid.appendChild(card);
});
