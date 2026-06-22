const colors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Yellow", value: "yellow" },
    { name: "Orange", value: "orange" },
    { name: "Purple", value: "purple" },
    { name: "Pink", value: "pink" },
    { name: "Brown", value: "brown" },
    { name: "Black", value: "black" },
    { name: "White", value: "white" }
];

let currentColor = 0;

function updateColor() {

    document.getElementById("colorName").textContent =
        colors[currentColor].name;

    document.getElementById("colorBox").style.background =
        colors[currentColor].value;

    if (colors[currentColor].name === "White") {
        document.getElementById("colorBox").style.border =
            "3px solid #ccc";
    } else {
        document.getElementById("colorBox").style.border =
            "none";
    }
}

function nextColor() {

    currentColor++;

    if (currentColor >= colors.length) {
        currentColor = 0;
    }

    updateColor();
}

function previousColor() {

    currentColor--;

    if (currentColor < 0) {
        currentColor = colors.length - 1;
    }

    updateColor();
}

function speakColor() {

    const speech =
        new SpeechSynthesisUtterance(
            colors[currentColor].name
        );

    speechSynthesis.speak(speech);
}

updateColor();