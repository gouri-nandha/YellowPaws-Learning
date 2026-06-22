const display = document.getElementById("selectedTheme");

function selectTheme(theme){
    localStorage.setItem("selectedTheme", theme);
    display.textContent = `🎉 ${theme.toUpperCase()} theme selected!`;
}

function goHome(){
    window.location.href = "index.html";
}
