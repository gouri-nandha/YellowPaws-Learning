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