const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let currentTool = 'brush';

// Initialize white background
if (canvas) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function startDrawing(e) {
    isDrawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const pos = getPos(e);
    const brushSizeEl = document.getElementById('brushSize');
    const colorPickerEl = document.getElementById('colorPicker');

    ctx.lineWidth = brushSizeEl ? brushSizeEl.value : 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (currentTool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
    } else {
        ctx.strokeStyle = colorPickerEl ? colorPickerEl.value : '#000000';
    }

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

if (canvas) {
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch support for tablets & mobile devices
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
}

function setTool(tool) {
    currentTool = tool;
    const btnBrush = document.getElementById('btnBrush');
    const btnEraser = document.getElementById('btnEraser');

    if (btnBrush) btnBrush.classList.remove('active');
    if (btnEraser) btnEraser.classList.remove('active');
    
    if (tool === 'brush' && btnBrush) {
        btnBrush.classList.add('active');
    } else if (btnEraser) {
        btnEraser.classList.add('active');
    }
}

function clearCanvas() {
    if (confirm("Are you sure you want to clear the drawing?")) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }
}

function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'My_YellowPaws_Drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}
