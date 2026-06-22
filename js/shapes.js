const shapes = [
    { name: "Circle", emoji: "⚪" },
    { name: "Square", emoji: "🟦" },
    { name: "Triangle", emoji: "🔺" },
    { name: "Rectangle", emoji: "▭" },
    { name: "Star", emoji: "⭐" },
    { name: "Heart", emoji: "❤️" },
    { name: "Diamond", emoji: "🔷" },
    { name: "Pentagon", emoji: "⬟" }
];

let currentShape = 0;

function updateShape() {

    document.getElementById("shapeEmoji").textContent =
        shapes[currentShape].emoji;

    document.getElementById("shapeName").textContent =
        shapes[currentShape].name;
}

function nextShape() {

    currentShape++;

    if (currentShape >= shapes.length) {
        currentShape = 0;
    }

    updateShape();
}

function previousShape() {

    currentShape--;

    if (currentShape < 0) {
        currentShape = shapes.length - 1;
    }

    updateShape();
}

function speakShape() {

    const speech =
        new SpeechSynthesisUtterance(
            shapes[currentShape].name
        );

    speechSynthesis.speak(speech);
}

updateShape();