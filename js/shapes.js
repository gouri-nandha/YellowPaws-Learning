const shapes = [
    { name: "Circle", label: "[Circle]" },
    { name: "Square", label: "[Square]" },
    { name: "Triangle", label: "[Triangle]" },
    { name: "Rectangle", label: "[Rectangle]" },
    { name: "Star", label: "[Star]" },
    { name: "Heart", label: "[Heart]" },
    { name: "Diamond", label: "[Diamond]" },
    { name: "Pentagon", label: "[Pentagon]" }
];

let currentShape = 0;

function updateShape() {
    document.getElementById("shapeEmoji").textContent = shapes[currentShape].label;
    document.getElementById("shapeName").textContent = shapes[currentShape].name;
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
    const speech = new SpeechSynthesisUtterance(shapes[currentShape].name);
    speechSynthesis.speak(speech);
}

updateShape();