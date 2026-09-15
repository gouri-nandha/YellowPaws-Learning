const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function numberToWord(n) {
    if (n === 100) return "One Hundred";
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return o === 0 ? tens[t] : `${tens[t]} ${ones[o]}`;
}

const numberData = [];
for (let i = 1; i <= 100; i++) {
    numberData.push({ num: i, text: numberToWord(i) });
}

// Cute kids-friendly items for 1-20
const itemIcons = {
    1: { name: "Apple", svg: `<svg viewBox="0 0 40 40" width="42" height="42"><circle cx="20" cy="22" r="14" fill="#e63946"/><path d="M20 8 Q23 2 27 5" stroke="#582f0e" stroke-width="2.5" fill="none"/><path d="M20 9 C25 4 30 7 28 13 C23 13 21 11 20 9 Z" fill="#2a9d8f"/><circle cx="16" cy="18" r="2" fill="#fff" opacity="0.6"/></svg>` },
    2: { name: "Ice Cream", svg: `<svg viewBox="0 0 40 40" width="40" height="40"><path d="M14 20 L26 20 L20 38 Z" fill="#e17055"/><circle cx="20" cy="15" r="9" fill="#ff7675"/><circle cx="20" cy="7" r="3" fill="#d63031"/></svg>` },
    3: { name: "Bird", svg: `<svg viewBox="0 0 40 40" width="38" height="38"><circle cx="18" cy="22" r="11" fill="#3a86ff"/><circle cx="27" cy="15" r="7" fill="#3a86ff"/><polygon points="33,14 40,17 33,19" fill="#fb8500"/><circle cx="29" cy="14" r="1.5" fill="#000"/><polygon points="9,24 2,20 6,28" fill="#1d3557"/></svg>` },
    4: { name: "Strawberry", svg: `<svg viewBox="0 0 40 40" width="36" height="36"><path d="M20 36 C10 26 8 16 20 12 C32 16 30 26 20 36 Z" fill="#ef233c"/><polygon points="20,13 14,8 18,10 20,6 22,10 26,8 20,13" fill="#38b000"/><circle cx="16" cy="20" r="1" fill="#ffd166"/><circle cx="24" cy="20" r="1" fill="#ffd166"/><circle cx="20" cy="26" r="1" fill="#ffd166"/></svg>` },
    5: { name: "Puppy", svg: `<svg viewBox="0 0 40 40" width="36" height="36"><circle cx="20" cy="20" r="15" fill="#ffd93d"/><ellipse cx="9" cy="18" rx="4" ry="8" fill="#e76f51"/><ellipse cx="31" cy="18" rx="4" ry="8" fill="#e76f51"/><circle cx="16" cy="18" r="2" fill="#000"/><circle cx="24" cy="18" r="2" fill="#000"/><ellipse cx="20" cy="23" rx="3" ry="2" fill="#e76f51"/></svg>` },
    6: { name: "Banana", svg: `<svg viewBox="0 0 40 40" width="36" height="36"><path d="M10 30 C12 14 26 8 32 10 C30 14 18 18 16 32 Z" fill="#ffb703" stroke="#fb8500" stroke-width="1.5"/><circle cx="32" cy="10" r="1.5" fill="#78350f"/></svg>` },
    7: { name: "Star", svg: `<svg viewBox="0 0 40 40" width="35" height="35"><polygon points="20,4 24,15 36,15 27,22 30,34 20,27 10,34 13,22 4,15 16,15" fill="#ffd166" stroke="#f59e0b" stroke-width="1.5"/></svg>` },
    8: { name: "Cherry", svg: `<svg viewBox="0 0 40 40" width="35" height="35"><circle cx="13" cy="27" r="7" fill="#d90429"/><circle cx="27" cy="27" r="7" fill="#d90429"/><path d="M13 22 Q20 8 22 6 Q20 16 27 22" stroke="#2d6a4f" stroke-width="2" fill="none"/><circle cx="11" cy="25" r="1.5" fill="#fff" opacity="0.6"/><circle cx="25" cy="25" r="1.5" fill="#fff" opacity="0.6"/></svg>` },
    9: { name: "Fish", svg: `<svg viewBox="0 0 40 40" width="35" height="35"><ellipse cx="18" cy="20" rx="12" ry="8" fill="#00b4d8"/><polygon points="28,20 36,14 36,26" fill="#0077b6"/><circle cx="12" cy="18" r="1.8" fill="#03045e"/></svg>` },
    10: { name: "Butterfly", svg: `<svg viewBox="0 0 40 40" width="34" height="34"><ellipse cx="14" cy="16" rx="6" ry="8" fill="#ff70a6"/><ellipse cx="26" cy="16" rx="6" ry="8" fill="#ff70a6"/><ellipse cx="15" cy="25" rx="5" ry="6" fill="#ffd166"/><ellipse cx="25" cy="25" rx="5" ry="6" fill="#ffd166"/><line x1="20" y1="12" x2="20" y2="29" stroke="#7209b7" stroke-width="2.5" stroke-linecap="round"/></svg>` },
    11: { name: "Cupcake", svg: `<svg viewBox="0 0 40 40" width="34" height="34"><path d="M12 22 L14 34 L26 34 L28 22 Z" fill="#b08968"/><path d="M10 22 C10 14 30 14 30 22 Z" fill="#ff758f"/><circle cx="20" cy="12" r="3" fill="#d90429"/></svg>` },
    12: { name: "Flower", svg: `<svg viewBox="0 0 40 40" width="33" height="33"><circle cx="20" cy="14" r="5" fill="#ff70a6"/><circle cx="20" cy="26" r="5" fill="#ff70a6"/><circle cx="14" cy="20" r="5" fill="#ff70a6"/><circle cx="26" cy="20" r="5" fill="#ff70a6"/><circle cx="20" cy="20" r="4" fill="#ffd166"/></svg>` },
    13: { name: "Candy", svg: `<svg viewBox="0 0 40 40" width="33" height="33"><circle cx="20" cy="20" r="9" fill="#ff4d6d"/><polygon points="12,20 4,14 4,26" fill="#3a86ff"/><polygon points="28,20 36,14 36,26" fill="#3a86ff"/><circle cx="20" cy="20" r="5" fill="#ffd166"/></svg>` },
    14: { name: "Carrot", svg: `<svg viewBox="0 0 40 40" width="32" height="32"><path d="M14 16 L26 16 L20 38 Z" fill="#f97316"/><path d="M18 16 L16 8 M20 16 L20 6 M22 16 L24 8" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/></svg>` },
    15: { name: "Kitten", svg: `<svg viewBox="0 0 40 40" width="32" height="32"><circle cx="20" cy="22" r="14" fill="#ffb703"/><polygon points="8,10 14,18 8,22" fill="#fb8500"/><polygon points="32,10 26,18 32,22" fill="#fb8500"/><circle cx="15" cy="20" r="1.8" fill="#333"/><circle cx="25" cy="20" r="1.8" fill="#333"/><ellipse cx="20" cy="24" rx="2" ry="1.5" fill="#ff4d6d"/></svg>` },
    16: { name: "Balloon", svg: `<svg viewBox="0 0 40 40" width="31" height="31"><ellipse cx="20" cy="18" rx="11" ry="14" fill="#8338ec"/><polygon points="20,32 17,35 23,35" fill="#8338ec"/><path d="M20 35 Q22 38 19 40" stroke="#aaa" stroke-width="1.5" fill="none"/></svg>` },
    17: { name: "Cookie", svg: `<svg viewBox="0 0 40 40" width="31" height="31"><circle cx="20" cy="20" r="14" fill="#d4a373"/><circle cx="16" cy="16" r="1.8" fill="#6f4e37"/><circle cx="24" cy="17" r="1.8" fill="#6f4e37"/><circle cx="18" cy="24" r="1.8" fill="#6f4e37"/><circle cx="24" cy="24" r="1.8" fill="#6f4e37"/></svg>` },
    18: { name: "Watermelon", svg: `<svg viewBox="0 0 40 40" width="30" height="30"><path d="M8 18 A14 14 0 0 0 32 18 Z" fill="#2d6a4f"/><path d="M10 18 A12 12 0 0 0 30 18 Z" fill="#ef233c"/><circle cx="16" cy="21" r="0.8" fill="#000"/><circle cx="20" cy="23" r="0.8" fill="#000"/><circle cx="24" cy="21" r="0.8" fill="#000"/></svg>` },
    19: { name: "Duck", svg: `<svg viewBox="0 0 40 40" width="30" height="30"><ellipse cx="18" cy="24" rx="12" ry="9" fill="#ffd166"/><circle cx="25" cy="16" r="7" fill="#ffd166"/><polygon points="30,15 38,18 30,20" fill="#f97316"/><circle cx="27" cy="14" r="1.2" fill="#000"/></svg>` },
    20: { name: "Sun", svg: `<svg viewBox="0 0 40 40" width="30" height="30"><circle cx="20" cy="20" r="9" fill="#ffb703"/><circle cx="20" cy="20" r="14" stroke="#fb8500" stroke-width="2" stroke-dasharray="3,3" fill="none"/></svg>` }
};

let currentNumber = 0;

function updateNumber() {
    const item = numberData[currentNumber];
    const num = item.num;
    document.getElementById("number").textContent = num;
    document.getElementById("numberText").textContent = item.text;

    const objectsContainer = document.getElementById("objects");
    if (objectsContainer) {
        if (num <= 20 && itemIcons[num]) {
            const iconInfo = itemIcons[num];
            let iconsHtml = `<div style="display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:6px; max-width:340px; margin:0 auto; padding:8px; background:#fffdf0; border-radius:18px; border:2px dashed #ffd93d;">`;
            for (let i = 0; i < num; i++) {
                iconsHtml += `<div style="display:inline-flex; align-items:center; justify-content:center;">${iconInfo.svg}</div>`;
            }
            iconsHtml += `</div><div style="font-size:0.95rem; font-weight:700; color:#d97706; margin-top:6px;">${num} ${iconInfo.name}${num > 1 ? 's' : ''}</div>`;
            objectsContainer.innerHTML = iconsHtml;
        } else {
            // Numbers 21 to 100: No images as requested, clean count indicator badge
            objectsContainer.innerHTML = `<div style="font-size:1.15rem; font-weight:bold; color:#78350f; padding:8px 22px; background:#fef3c7; border-radius:16px; border:2px solid #fcd34d; display:inline-block;">Number ${num} of 100</div>`;
        }
    }
}

function nextNumber() {
    currentNumber++;
    if (currentNumber >= numberData.length) {
        currentNumber = 0;
    }
    updateNumber();
}

function previousNumber() {
    currentNumber--;
    if (currentNumber < 0) {
        currentNumber = numberData.length - 1;
    }
    updateNumber();
}

function speakNumber() {
    let speech = new SpeechSynthesisUtterance(numberData[currentNumber].text);
    speechSynthesis.speak(speech);
}

function testPronunciation() {
    const expectedWord = numberData[currentNumber].text;
    const objectsElement = document.getElementById("objects");
    
    listenToPronunciation(expectedWord, (isCorrect, spokenWord) => {
        if (objectsElement) objectsElement.classList.remove("mascot-happy", "mascot-sad");
        
        if (isCorrect) {
            if (objectsElement) objectsElement.classList.add("mascot-happy");
            alert(`Great job! You said "${spokenWord}" correctly! +1 Star!`);
            let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
            const newStars = (profile.stars || 0) + 1;
            if (window.YellowPawsStorage) {
                window.YellowPawsStorage.updateProfile({ stars: newStars });
            } else {
                profile.stars = newStars;
                localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
            }
        } else {
            if (objectsElement) objectsElement.classList.add("mascot-sad");
            alert(`Oops! We heard "${spokenWord}". Try again to say "${expectedWord}"!`);
        }
    });
}

document.addEventListener("DOMContentLoaded", updateNumber);
updateNumber();