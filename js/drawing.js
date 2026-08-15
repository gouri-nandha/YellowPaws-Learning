let canvas, ctx;
let isDrawing = false;
let currentColor = "#ff4d6d";
let currentLineWidth = 6;

function initCanvas() {
    canvas = document.getElementById("paintCanvas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    
    // Set actual width and height
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 600;
    canvas.height = rect.height || 380;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentLineWidth;

    // Mouse events
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // Touch events
    canvas.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchend", () => {
        const mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    });
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    if (isDrawing) {
        ctx.closePath();
        isDrawing = false;
    }
}

function setColor(color, element) {
    currentColor = color;
    ctx.strokeStyle = currentColor;
    document.querySelectorAll(".color-dot").forEach(dot => dot.classList.remove("active"));
    if (element) element.classList.add("active");
}

function setEraser(element) {
    currentColor = "#ffffff";
    ctx.strokeStyle = currentColor;
    document.querySelectorAll(".color-dot").forEach(dot => dot.classList.remove("active"));
}

function setLineWidth(width) {
    currentLineWidth = width;
    if (ctx) ctx.lineWidth = currentLineWidth;
}

function clearCanvas() {
    if (confirm("Clear your drawing canvas?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function saveDrawing() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "YellowPaws_Drawing.png";
    link.href = dataURL;
    link.click();
    alert("Drawing saved! +2 Bonus Stars!");

    let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
    const newStars = (profile.stars || 0) + 2;
    if (window.YellowPawsStorage) {
        window.YellowPawsStorage.updateProfile({ stars: newStars });
        window.YellowPawsStorage.addHistory("Created artwork in Drawing Book");
    }
}

document.addEventListener("DOMContentLoaded", initCanvas);
