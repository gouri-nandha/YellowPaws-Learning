document.addEventListener("DOMContentLoaded", () => {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile"));

    if (!profile) {
        window.location.href = "profile.html";
        return;
    }

    const stars = profile?.stars || 0;

    const childNameElem = document.getElementById("childName");
    if (childNameElem) {
        childNameElem.textContent = profile?.nickname || profile?.username || "Student";
    }

    const starCountElem = document.getElementById("starCount");
    if (starCountElem) {
        starCountElem.textContent = stars;
    }

    let title = "Learning Explorer";

    if (stars >= 200) {
        title = "YellowPaws Hero";
    }
    else if (stars >= 100) {
        title = "Learning Champion";
    }
    else if (stars >= 50) {
        title = "Super Student";
    }
    else if (stars >= 25) {
        title = "Rising Learner";
    }
    else if (stars >= 5) {
        title = "First Quiz Star";
    }

    const titleElem = document.getElementById("certificateTitle");
    if (titleElem) {
        titleElem.textContent = title;
    }

    const today = new Date();
    const dateElem = document.getElementById("certificateDate");
    if (dateElem) {
        dateElem.textContent = "Awarded on: " + today.toLocaleDateString();
    }
});