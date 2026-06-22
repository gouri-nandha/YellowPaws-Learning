const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [...emojis, ...emojis];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function shuffle() {
    cards.sort(() => Math.random() - 0.5);
}

function initGame() {
    shuffle();
    const grid = document.getElementById("memoryGrid");
    grid.innerHTML = "";
    matches = 0;
    
    cards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("memory-card", "hidden");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.textContent = emoji;
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
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === emojis.length) {
            document.getElementById("memoryStatus").textContent = "🎉 You won! +5 Stars!";
            let profile = JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars:0};
            profile.stars = (profile.stars || 0) + 5;
            localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
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
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.addEventListener("DOMContentLoaded", initGame);
