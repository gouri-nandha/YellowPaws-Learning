// Timer logic for screen time limits
let timeInterval;

function startTimer() {
    // Only run if not on the lock screen
    if (window.location.pathname.includes('lock.html')) return;

    timeInterval = setInterval(() => {
        let usedSeconds = Number(localStorage.getItem("usedTime")) || 0;
        usedSeconds += 1;
        localStorage.setItem("usedTime", usedSeconds);

        // Check against limit
        let limitMinutes = Number(localStorage.getItem("screenTimeLimit"));
        if (limitMinutes && limitMinutes > 0) {
            let limitSeconds = limitMinutes * 60;
            if (usedSeconds >= limitSeconds) {
                clearInterval(timeInterval);
                window.location.href = "lock.html";
            }
        }
    }, 1000);
}

// Start timer when page loads
document.addEventListener("DOMContentLoaded", startTimer);