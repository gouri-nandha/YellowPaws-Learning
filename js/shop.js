const shopItems = [
    { id: "hat1", name: "Cool Hat", price: 20, image: "assets/images/shop/cool_hat.png", tag: "Hat" },
    { id: "glasses1", name: "Star Glasses", price: 30, image: "assets/images/shop/star_glasses.png", tag: "Glasses" },
    { id: "theme_rainbow", name: "Rainbow Theme", price: 50, image: "assets/images/shop/rainbow_theme.png", tag: "Theme" }
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
        div.style.padding = "20px 15px";
        
        const isUnlocked = unlocked.includes(item.id);
        
        div.innerHTML = `
            <div style="width:110px; height:110px; border-radius:20px; overflow:hidden; margin-bottom:12px; border:3px solid #ffb703; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 14px rgba(0,0,0,0.08);">
                <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <h3 style="margin: 6px 0 10px 0; font-size:1.3rem; color:#2c3e50;">${item.name}</h3>
            ${isUnlocked 
                ? '<button disabled style="background:#cbd5e1; color:#64748b; border:2px solid #94a3b8; cursor:default; max-width:200px; padding:10px 16px; font-size:1rem;">Unlocked</button>' 
                : `<button onclick="buyItem('${item.id}', ${item.price})" style="max-width:200px; padding:10px 16px; font-size:1rem;">⭐ ${item.price} Stars</button>`
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
