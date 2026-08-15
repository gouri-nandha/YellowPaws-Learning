const shopItems = [
    { id: "hat1", name: "Cool Hat", price: 20, tag: "[Hat]" },
    { id: "glasses1", name: "Star Glasses", price: 30, tag: "[Glasses]" },
    { id: "theme_rainbow", name: "Rainbow Theme", price: 50, tag: "[Theme]" }
];

function loadShop() {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
    const unlocked = JSON.parse(localStorage.getItem("yellowPawsUnlocked")) || profile.unlockedItems || [];
    
    document.getElementById("shopStars").textContent = profile.stars || 0;
    
    const container = document.getElementById("shopItems");
    if (!container) return;
    container.innerHTML = "";
    
    shopItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "subject-card";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        
        const isUnlocked = unlocked.includes(item.id);
        
        div.innerHTML = `
            <div style="font-size: 1.5rem; font-weight: bold; color: #FFB703; margin-bottom: 10px;">${item.tag}</div>
            <h3 style="margin: 10px 0;">${item.name}</h3>
            ${isUnlocked 
                ? '<button disabled style="background:#ccc;">Unlocked</button>' 
                : `<button onclick="buyItem('${item.id}', ${item.price})">${item.price} Stars</button>`
            }
        `;
        
        container.appendChild(div);
    });
}

function buyItem(id, price) {
    const profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
    let unlocked = JSON.parse(localStorage.getItem("yellowPawsUnlocked")) || profile.unlockedItems || [];
    
    if ((profile.stars || 0) >= price) {
        profile.stars -= price;
        unlocked.push(id);
        
        if (window.YellowPawsStorage) {
            window.YellowPawsStorage.updateProfile({ stars: profile.stars, unlockedItems: unlocked });
        } else {
            localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
        }
        localStorage.setItem("yellowPawsUnlocked", JSON.stringify(unlocked));
        
        alert("Purchase successful!");
        loadShop();
    } else {
        alert("Oops! You don't have enough stars. Keep learning to earn more!");
    }
}

document.addEventListener("DOMContentLoaded", loadShop);
