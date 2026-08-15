const profile = JSON.parse(localStorage.getItem("yellowPawsProfile")) || {};
const nickname = profile.nickname || localStorage.getItem("nickname") || "Friend";
const avatar = profile.avatar || localStorage.getItem("avatar") || "🐶";
const stars = profile.stars ?? (localStorage.getItem("stars") || 0);

const welcomeElem = document.getElementById("welcomeText");
if (welcomeElem) welcomeElem.textContent = `Welcome, ${nickname}!`;

const avatarElem = document.getElementById("avatarDisplay");
if (avatarElem) avatarElem.textContent = avatar;

const starElem = document.getElementById("starCount");
if (starElem) starElem.textContent = stars;

applyTheme();

function startQuiz(subject){

    localStorage.setItem(
        "currentSubject",
        subject
    );

    window.location.href =
    "quiz.html";
}

function applyTheme(){

    const theme =
    localStorage.getItem(
        "selectedTheme"
    );

    switch(theme){

        case "jungle":
            document.body.style.backgroundColor =
            "#A7F3A1";
            break;

        case "space":
            document.body.style.backgroundColor =
            "#B8C0FF";
            break;

        case "ocean":
            document.body.style.backgroundColor =
            "#9EE7FF";
            break;

        case "fantasy":
            document.body.style.backgroundColor =
            "#FFD6EC";
            break;

        case "rainbow":
            document.body.style.backgroundColor =
            "#FFF0A6";
            break;
    }
}