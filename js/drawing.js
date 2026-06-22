const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let currentTool = 'brush';

// Initialize white background
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = document.getElementById('brushSize').value;
    ctx.lineCap = 'round';
    
    if (currentTool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
    } else {
        ctx.strokeStyle = document.getElementById('colorPicker').value;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function setTool(tool) {
    currentTool = tool;
    document.getElementById('btnBrush').classList.remove('active');
    document.getElementById('btnEraser').classList.remove('active');
    
    if (tool === 'brush') {
        document.getElementById('btnBrush').classList.add('active');
    } else {
        document.getElementById('btnEraser').classList.add('active');
    }
}

function clearCanvas() {
    if (confirm("Are you sure you want to clear the drawing?")) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'My_YellowPaws_Drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}
