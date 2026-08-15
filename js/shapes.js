const shapes = [
    { name: "Circle" },
    { name: "Square" },
    { name: "Triangle" },
    { name: "Rectangle" },
    { name: "Star" },
    { name: "Heart" },
    { name: "Diamond" },
    { name: "Pentagon" }
];

let currentShape = 0;

function updateShape() {
    const shape = shapes[currentShape];
    const container = document.getElementById("shapeEmoji");
    if (container) {
        if (window.YellowPawsIcons && window.YellowPawsIcons.shapes[shape.name]) {
            container.innerHTML = window.YellowPawsIcons.shapes[shape.name];
        } else {
            container.textContent = shape.name;
        }
    }
    document.getElementById("shapeName").textContent = shape.name;
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

document.addEventListener("DOMContentLoaded", updateShape);