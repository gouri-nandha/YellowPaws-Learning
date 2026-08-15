const shapes = [
    { name: "Circle" },
    { name: "Square" },
    { name: "Triangle" },
    { name: "Rectangle" },
    { name: "Star" },
    { name: "Heart" },
    { name: "Diamond" },
    { name: "Pentagon" },
    { name: "Hexagon" },
    { name: "Octagon" },
    { name: "Oval" },
    { name: "Crescent" },
    { name: "Cross" },
    { name: "Cube" },
    { name: "Sphere" }
];

let currentShape = 0;

function updateShape() {
    const shape = shapes[currentShape];
    const container = document.getElementById("shapeEmoji");
    if (container) {
        if (window.YellowPawsIcons && window.YellowPawsIcons.shapes && window.YellowPawsIcons.shapes[shape.name]) {
            container.innerHTML = window.YellowPawsIcons.shapes[shape.name];
        } else {
            container.textContent = shape.name;
        }
    }
    document.getElementById("shapeName").textContent = shape.name;

    if (window.YellowPawsStorage && window.YellowPawsStorage.addHistory) {
        window.YellowPawsStorage.addHistory(`Explored shape: ${shape.name}`);
    }
}

function nextShape() {
    currentShape = (currentShape + 1) % shapes.length;
    updateShape();
}

function previousShape() {
    currentShape = (currentShape - 1 + shapes.length) % shapes.length;
    updateShape();
}

function speakShape() {
    const speech = new SpeechSynthesisUtterance(shapes[currentShape].name);
    speechSynthesis.speak(speech);
}

document.addEventListener("DOMContentLoaded", updateShape);