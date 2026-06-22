const nickname =
localStorage.getItem("nickname");

const avatar =
localStorage.getItem("avatar");

const stars =
localStorage.getItem("stars") || 0;

document.getElementById(
    "welcomeText"
).textContent =
`Welcome, ${nickname}!`;

document.getElementById(
    "avatarDisplay"
).textContent = avatar;

document.getElementById(
    "starCount"
).textContent = stars;

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
            document.body.style.background =
            "#A7F3A1";
            break;

        case "space":
            document.body.style.background =
            "#B8C0FF";
            break;

        case "ocean":
            document.body.style.background =
            "#9EE7FF";
            break;

        case "fantasy":
            document.body.style.background =
            "#FFD6EC";
            break;

        case "rainbow":
            document.body.style.background =
            "#FFF0A6";
            break;
    }
}