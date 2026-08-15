// YellowPaws Global Navigation Bar Component
function initYellowPawsNavbar() {
    // Avoid double insertion
    if (document.getElementById("yellowpaws-navbar")) return;

    const navHTML = `
    <nav id="yellowpaws-navbar" class="yp-navbar">
        <div class="yp-nav-brand" onclick="location.href='learninghub.html'">
            <img src="assets/mascot/yellowpaws_logo.png" onerror="this.src='assets/avatars/puppy.svg'" alt="Mascot" class="yp-nav-logo">
            <span class="yp-nav-title">YellowPaws</span>
        </div>
        <div class="yp-nav-menu">
            <a href="learninghub.html" class="yp-nav-item">Hub</a>
            <a href="theme.html" class="yp-nav-item">Themes</a>
            <a href="parent.html" class="yp-nav-item">Parent Board</a>
            <a href="settings.html" class="yp-nav-item">Settings</a>
            <button onclick="ypNavLogout()" class="yp-nav-btn">Logout</button>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navHTML);
}

function ypNavLogout() {
    if (confirm("Are you sure you want to logout?")) {
        if (window.YellowPawsStorage) {
            window.YellowPawsStorage.logout();
        } else {
            localStorage.removeItem("yellowPawsProfile");
        }
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", initYellowPawsNavbar);
