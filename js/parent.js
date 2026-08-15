const CORRECT_PIN = "1234";

function verifyPin() {
    const enteredPin = document.getElementById("pinInput").value;

    if (enteredPin === CORRECT_PIN) {
        document.getElementById("pinSection").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        loadDashboard();
    } else {
        document.getElementById("pinMessage").textContent = "Incorrect PIN";
        document.getElementById("pinMessage").style.color = "red";
    }
}

function loadDashboard() {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {};
    
    const avatarContainer = document.getElementById("childAvatarContainer");
    if (avatarContainer) {
        const avName = profile.avatar || "Puppy";
        const avFileMap = {
            Puppy: "assets/avatars/puppy.png",
            Kitten: "assets/avatars/kitten.png",
            "Lion Cub": "assets/avatars/lion.png",
            Bunny: "assets/avatars/bunny.png"
        };
        const pngSrc = avFileMap[avName] || "assets/avatars/puppy.png";
        const svgFallback = window.YellowPawsIcons && window.YellowPawsIcons.avatars[avName] ? window.YellowPawsIcons.avatars[avName] : `<span>${avName}</span>`;

        avatarContainer.innerHTML = `<img src="${pngSrc}" onerror="this.outerHTML='${svgFallback.replace(/'/g, "\\'")}'" style="width:55px; height:55px; object-fit:contain; border-radius:50%; border:2px solid #FFD93D;" alt="${avName}">`;
    }

    document.getElementById("childNickname").textContent = profile.nickname || profile.username || "Unknown";
    
    let stars = profile.stars || 0;
    document.getElementById("totalStars").textContent = stars;
    
    let rank = "Beginner";
    if (stars >= 200) rank = "YellowPaws Hero";
    else if (stars >= 100) rank = "Learning Champion";
    else if (stars >= 50) rank = "Super Student";
    else if (stars >= 25) rank = "Rising Learner";
    else if (stars >= 5) rank = "First Quiz Star";
    
    document.getElementById("childRank").textContent = rank;

    document.getElementById("quizCount").textContent = profile.quizCount || profile.quiz_count || 0;

    const usedSeconds = Number(localStorage.getItem("usedTime")) || 0;
    const minutes = Math.floor(usedSeconds / 60);
    document.getElementById("timeUsed").textContent = minutes + " Minutes";

    renderChart(stars, profile.quizCount || 0, minutes);
}

let progressChartInstance = null;

function renderChart(stars, quizzes, minutes) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    if (progressChartInstance) {
        progressChartInstance.destroy();
    }
    
    progressChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Stars', 'Quizzes', 'Time (mins)'],
            datasets: [{
                label: 'Learning Progress',
                data: [stars, quizzes, minutes],
                backgroundColor: ['#FFD700', '#4CAF50', '#2196F3'],
                borderColor: ['#DAA520', '#388E3C', '#1976D2'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function saveTimeLimit() {
    const limit = document.getElementById("timeLimit").value;
    localStorage.setItem("screenTimeLimit", limit);
    alert("Screen time limit saved!");
}

function resetProgress() {
    if (confirm("Are you sure you want to reset all progress?")) {
        if (window.YellowPawsStorage) {
            window.YellowPawsStorage.logout();
        }
        localStorage.removeItem("yellowPawsProfile");
        localStorage.removeItem("usedTime");
        alert("Progress reset successfully!");
        window.location.href = "index.html";
    }
}

function resetStars() {
    if (confirm("Reset only the stars?")) {
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

function exportReport() {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {};
    const usedSeconds = Number(localStorage.getItem("usedTime")) || 0;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text("YellowPaws Learning Report", 20, 20);
    
    doc.setFontSize(16);
    doc.text(`Child: ${profile.nickname || profile.username || "Unknown"}`, 20, 40);
    doc.text(`Total Stars: ${profile.stars || 0}`, 20, 50);
    doc.text(`Quizzes Completed: ${profile.quizCount || 0}`, 20, 60);
    doc.text(`Learning Time: ${Math.floor(usedSeconds / 60)} minutes`, 20, 70);
    
    doc.save("YellowPaws_Report.pdf");
}
