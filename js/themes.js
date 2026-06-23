const display =
document.getElementById("selectedTheme");

function selectTheme(theme){

    localStorage.setItem(
        "selectedTheme",
        theme
    );

    display.textContent =
    `🎉 ${theme.toUpperCase()} theme selected!`;

    switch(theme){
        case "jungle": document.body.style.backgroundColor = "#A7F3A1"; break;
        case "space": document.body.style.backgroundColor = "#B8C0FF"; break;
        case "ocean": document.body.style.backgroundColor = "#9EE7FF"; break;
        case "fantasy": document.body.style.backgroundColor = "#FFD6EC"; break;
        case "rainbow": document.body.style.backgroundColor = "#FFF0A6"; break;
    }
}

function goHome(){

    window.location.href =
    "index.html";

}