let selectedAvatar = "Puppy";
let currentMode = "register";

function selectAvatar(avatar) {
    selectedAvatar = avatar;
    document.querySelectorAll(".avatar").forEach(item => {
        item.classList.remove("selected");
        if (item.textContent.trim() === avatar) {
            item.classList.add("selected");
        }
    });
}

function switchMode(mode) {
    currentMode = mode;
    const regFields = document.getElementById("registerFields");
    const heading = document.getElementById("formHeading");
    const submitBtn = document.getElementById("submitBtn");
    const tabReg = document.getElementById("tabRegister");
    const tabLog = document.getElementById("tabLogin");
    const msg = document.getElementById("message");

    if (msg) msg.textContent = "";

    if (mode === "login") {
        if (regFields) regFields.style.display = "none";
        if (heading) heading.textContent = "User Login";
        if (submitBtn) submitBtn.textContent = "Login & Continue";
        if (tabReg) tabReg.style.backgroundColor = "#e0e0e0";
        if (tabLog) tabLog.style.backgroundColor = "#FFB703";
    } else {
        if (regFields) regFields.style.display = "block";
        if (heading) heading.textContent = "Create Account & Profile";
        if (submitBtn) submitBtn.textContent = "Save Account & Continue";
        if (tabReg) tabReg.style.backgroundColor = "#FFB703";
        if (tabLog) tabLog.style.backgroundColor = "#e0e0e0";
    }
}

async function handleSubmit() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("message");

    if (!username || !password) {
        alert("Please enter both username and password!");
        return;
    }

    try {
        if (currentMode === "login") {
            const res = await window.YellowPawsStorage.login(username, password);
            if (msg) {
                msg.textContent = `Welcome back, ${res.profile.nickname || res.profile.username}!`;
                msg.style.color = "green";
            }
        } else {
            const nickname = document.getElementById("nickname").value.trim() || username;
            const res = await window.YellowPawsStorage.register(username, password, nickname, selectedAvatar);
            if (msg) {
                msg.textContent = `Account created! Welcome ${res.profile.nickname}!`;
                msg.style.color = "green";
            }
        }

        setTimeout(() => {
            window.location.href = "learninghub.html";
        }, 1200);

    } catch (err) {
        if (msg) {
            msg.textContent = err.message || "An error occurred";
            msg.style.color = "red";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    switchMode("register");
});