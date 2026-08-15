const symbols = ['A', 'B', 'C', 'D', '1', '2', '3', '4'];
let cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function speak(text) {
    if ('speechSynthesis' in window && localStorage.getItem("soundOn") !== "false") {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
}

function shuffle() {
    cards.sort(() => Math.random() - 0.5);
}

function initGame() {
    shuffle();
    const grid = document.getElementById("memoryGrid");
    if (!grid) return;
    
    grid.innerHTML = "";
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    
    const statusEl = document.getElementById("memoryStatus");
    if (statusEl) statusEl.textContent = "Find all the matching pairs!";
    
    cards.forEach((sym, index) => {
        const card = document.createElement("div");
        card.classList.add("memory-card", "hidden");
        card.dataset.sym = sym;
        card.dataset.index = index;
        card.textContent = sym;
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.remove("hidden");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.sym === secondCard.dataset.sym;

    if (isMatch) {
        disableCards();
        matches++;
        speak("Match!");
        if (matches === symbols.length) {
            const statusEl = document.getElementById("memoryStatus");
            if (statusEl) statusEl.textContent = "You won! +5 Stars!";
            
            let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars:0};
            const newStars = (profile.stars || 0) + 5;
            if (window.YellowPawsStorage) {
                window.YellowPawsStorage.updateProfile({ stars: newStars });
            } else {
                profile.stars = newStars;
                localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
            }
            
            speak("Congratulations! You found all pairs and earned 5 stars!");
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        if (firstCard) firstCard.classList.add("hidden");
        if (secondCard) secondCard.classList.add("hidden");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.addEventListener("DOMContentLoaded", initGame);
