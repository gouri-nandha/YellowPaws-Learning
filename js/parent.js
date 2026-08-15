const CORRECT_PIN = "1234";
let portalMode = "pin";
let parentSubAuthTab = "login";

function switchPortalMode(mode) {
    portalMode = mode;
    const tabPin = document.getElementById("tabPin");
    const tabAuth = document.getElementById("tabParentAuth");
    const pinDiv = document.getElementById("pinModeDiv");
    const authDiv = document.getElementById("authModeDiv");
    const portalMsg = document.getElementById("portalMessage");

    if (portalMsg) portalMsg.textContent = "";

    if (mode === "pin") {
        if (tabPin) tabPin.style.backgroundColor = "#FFB703";
        if (tabAuth) tabAuth.style.backgroundColor = "#e0e0e0";
        if (pinDiv) pinDiv.style.display = "block";
        if (authDiv) authDiv.style.display = "none";
    } else {
        if (tabPin) tabPin.style.backgroundColor = "#e0e0e0";
        if (tabAuth) tabAuth.style.backgroundColor = "#FFB703";
        if (pinDiv) pinDiv.style.display = "none";
        if (authDiv) authDiv.style.display = "block";
    }
}

function switchParentAuthTab(tab) {
    parentSubAuthTab = tab;
    const tabLogin = document.getElementById("tabParentSubLogin");
    const tabRegister = document.getElementById("tabParentSubRegister");
    const confirmPass = document.getElementById("parentConfirmPassDiv");
    const submitBtn = document.getElementById("parentAuthSubmitBtn");
    const portalMsg = document.getElementById("portalMessage");

    if (portalMsg) portalMsg.textContent = "";

    if (tab === "login") {
        if (tabLogin) tabLogin.style.backgroundColor = "#FFB703";
        if (tabRegister) tabRegister.style.backgroundColor = "#e0e0e0";
        if (confirmPass) confirmPass.style.display = "none";
        if (submitBtn) submitBtn.textContent = "Login & Continue";
    } else {
        if (tabLogin) tabLogin.style.backgroundColor = "#e0e0e0";
        if (tabRegister) tabRegister.style.backgroundColor = "#FFB703";
        if (confirmPass) confirmPass.style.display = "block";
        if (submitBtn) submitBtn.textContent = "Register & Continue";
    }
}

function verifyPin() {
    const enteredPin = document.getElementById("pinInput").value;
    const portalMsg = document.getElementById("portalMessage");

    if (enteredPin === CORRECT_PIN) {
        showDashboard();
    } else {
        if (portalMsg) {
            portalMsg.textContent = "Incorrect PIN Code!";
            portalMsg.style.color = "red";
        }
    }
}

function handleParentAuthSubmit() {
    const user = document.getElementById("parentUser").value.trim();
    const pass = document.getElementById("parentPass").value.trim();
    const portalMsg = document.getElementById("portalMessage");

    if (!user || !pass) {
        alert("Please enter parent email/username and password!");
        return;
    }

    if (parentSubAuthTab === "register") {
        const confirmPass = document.getElementById("parentConfirmPass").value.trim();
        if (pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }
        localStorage.setItem("parentUsername", user);
        localStorage.setItem("parentPassword", pass);
        if (portalMsg) {
            portalMsg.textContent = "Parent account created successfully!";
            portalMsg.style.color = "green";
        }
        setTimeout(showDashboard, 1000);
    } else {
        const localUser = localStorage.getItem("parentUsername") || "parent";
        const localPass = localStorage.getItem("parentPassword") || "parent123";
        
        if (user === localUser && pass === localPass) {
            if (portalMsg) {
                portalMsg.textContent = "Welcome back, parent!";
                portalMsg.style.color = "green";
            }
            setTimeout(showDashboard, 1000);
        } else {
            if (portalMsg) {
                portalMsg.textContent = "Invalid username or password!";
                portalMsg.style.color = "red";
            }
        }
    }
}

function showDashboard() {
    document.getElementById("parentPortal").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadDashboard();
}

function loadDashboard() {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {};
    
    // Child Avatar Display
    const avatarContainer = document.getElementById("childAvatarContainer");
    if (avatarContainer) {
        const avName = profile.avatar || "Puppy";
        const avFileMap = {
            Puppy: "assets/avatars/puppy.svg",
            Kitten: "assets/avatars/kitten.svg",
            "Lion Cub": "assets/avatars/lion.svg",
            Bunny: "assets/avatars/bunny.svg"
        };
        const avatarSrc = avFileMap[avName] || "assets/avatars/puppy.svg";
        avatarContainer.innerHTML = `<img src="${avatarSrc}" style="width:65px; height:65px; object-fit:contain; border-radius:50%; border:2px solid #FFD93D;" alt="${avName}">`;
    }

    document.getElementById("childNickname").textContent = profile.nickname || profile.username || "Unknown";
    document.getElementById("totalStars").textContent = profile.stars || 0;
    document.getElementById("childStreak").textContent = `${profile.streak || 1} Days`;
    
    let stars = profile.stars || 0;
    let rank = "Beginner";
    if (stars >= 200) rank = "YellowPaws Hero";
    else if (stars >= 100) rank = "Learning Champion";
    else if (stars >= 50) rank = "Super Student";
    else if (stars >= 25) rank = "Rising Learner";
    else if (stars >= 5) rank = "First Quiz Star";
    document.getElementById("childRank").textContent = rank;

    // Load History Activity Log
    const historyList = document.getElementById("historyLogList");
    if (historyList) {
        const listData = profile.learningHistory || [];
        if (listData.length === 0) {
            historyList.innerHTML = `<p style="color:#777; font-style:italic;">No learning activities logged yet.</p>`;
        } else {
            historyList.innerHTML = listData.map(item => `
                <div style="padding: 6px 10px; border-bottom: 1px solid #eee; font-size:0.9rem; color:#444;">
                    [Circle] ${item}
                </div>
            `).join("");
        }
    }

    // Chart Analytics
    const usedSeconds = Number(localStorage.getItem("usedTime")) || 0;
    const minutes = Math.floor(usedSeconds / 60);
    const quizzes = profile.quizCount || profile.quiz_count || 0;

    renderChart(stars, quizzes, minutes);
}

let progressChartInstance = null;

function renderChart(stars, quizzes, minutes) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    if (!ctx) return;
    
    if (progressChartInstance) {
        progressChartInstance.destroy();
    }
    
    progressChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Stars', 'Quizzes Passed', 'Time Spent (min)'],
            datasets: [{
                label: 'Learning Progress Indicators',
                data: [stars, quizzes, minutes],
                backgroundColor: ['#FFB703', '#06d6a0', '#3a86ff'],
                borderColor: ['#e76f51', '#048a65', '#240046'],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function saveTimeLimit() {
    const limit = document.getElementById("timeLimit").value;
    localStorage.setItem("screenTimeLimit", limit);
    alert("Screen time limit saved successfully!");
}

function resetStars() {
    if (confirm("Reset stars back to 0?")) {
        if (window.YellowPawsStorage) {
            window.YellowPawsStorage.updateProfile({ stars: 0 });
        } else {
            const profile = JSON.parse(localStorage.getItem("yellowPawsProfile"));
            if (profile) {
                profile.stars = 0;
                localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
            }
        }
        alert("Stars reset!");
        loadDashboard();
    }
}

function resetProgress() {
    if (confirm("Are you sure you want to reset all progress?")) {
        if (window.YellowPawsStorage) {
            window.YellowPawsStorage.logout();
        }
        localStorage.removeItem("yellowPawsProfile");
        localStorage.removeItem("usedTime");
        alert("Progress reset completed!");
        window.location.href = "index.html";
    }
}

function exportReport() {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {};
    const usedSeconds = Number(localStorage.getItem("usedTime")) || 0;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text("YellowPaws Learning Progress Report", 20, 20);
    
    doc.setFontSize(16);
    doc.text(`Child Name: ${profile.nickname || profile.username || "Unknown"}`, 20, 40);
    doc.text(`Total Stars: ${profile.stars || 0}`, 20, 50);
    doc.text(`Quizzes Completed: ${profile.quizCount || 0}`, 20, 60);
    doc.text(`Total Learning Time: ${Math.floor(usedSeconds / 60)} minutes`, 20, 70);
    
    doc.save("YellowPaws_Report.pdf");
}
