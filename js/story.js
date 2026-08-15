const stories = [
    {
        title: "The Tortoise & The Hare",
        image: "assets/images/stories/tortoise_hare.png",
        slides: [
            "Once upon a time, a speedy Hare bragged about how fast he could run.",
            "Tired of hearing him boast, the slow Tortoise challenged him to a race.",
            "The Hare ran far ahead and decided to take a nap under a shady tree.",
            "Meanwhile, the Tortoise kept walking step by step without stopping.",
            "When the Hare woke up, the Tortoise was already crossing the finish line!"
        ],
        moral: "Slow and steady wins the race!"
    },
    {
        title: "The Lion & The Mouse",
        image: "assets/images/stories/lion_mouse.png",
        slides: [
            "A mighty Lion trapped a tiny Mouse, but decided to let him go free.",
            "The Mouse promised to help the Lion one day if he ever needed it.",
            "Later, hunters caught the Lion in a heavy rope net in the forest.",
            "The tiny Mouse heard his roars and quickly chewed through the strong ropes.",
            "The Lion was freed and realized even the smallest friend can be a big help!"
        ],
        moral: "Little friends can prove to be great friends!"
    },
    {
        title: "The Ant & The Grasshopper",
        image: "assets/images/stories/ant_grasshopper.png",
        slides: [
            "In summer, a hardworking Ant collected food while a Grasshopper sang all day.",
            "The Ant warned him to prepare for the cold winter ahead.",
            "When winter arrived, snow covered the ground and no food was left.",
            "The Grasshopper was hungry and asked the Ant for something to eat.",
            "The Ant shared her food, and the Grasshopper learned to plan ahead."
        ],
        moral: "Work hard today to prepare for tomorrow!"
    },
    {
        title: "The Crow & The Pitcher",
        image: "assets/images/stories/crow_pitcher.png",
        slides: [
            "A thirsty Crow found a pitcher with water at the very bottom.",
            "His beak couldn't reach the water inside the tall pitcher.",
            "He thought hard and began dropping small pebbles into the pitcher one by one.",
            "As pebbles filled the bottom, the water slowly rose to the top.",
            "The clever Crow drank the fresh water and flew away happily!"
        ],
        moral: "Where there is a will, there is a way!"
    },
    {
        title: "The Honest Woodcutter",
        image: "assets/images/stories/honest_woodcutter.png",
        slides: [
            "An honest Woodcutter accidentally dropped his iron axe into a deep river.",
            "A river fairy appeared with a golden axe, but he said it was not his.",
            "She brought a silver axe, but he again truthfully said it was not his.",
            "Finally, she showed his old iron axe, and he smiled with joy.",
            "Pleased with his honesty, the fairy gifted him all three axes!"
        ],
        moral: "Honesty is the best policy!"
    },
    {
        title: "The Fox & The Grapes",
        image: "assets/images/stories/fox_grapes.png",
        slides: [
            "A hungry Fox saw juicy purple grapes hanging high on a vine.",
            "He took a running start and jumped high, but missed them.",
            "He tried jumping again and again until he grew tired.",
            "Walking away, he said, 'Those grapes are probably sour anyway.'",
            "He pretended he didn't care because he couldn't reach them."
        ],
        moral: "It's easy to dislike what you cannot get!"
    },
    {
        title: "The Boy Who Cried Wolf",
        image: "assets/images/stories/boy_wolf.png",
        slides: [
            "A bored shepherd boy shouted 'Wolf! Wolf!' to trick the villagers.",
            "Villagers ran up the hill to help, only to find no wolf.",
            "He laughed and tricked them a second time the next week.",
            "One evening, a real wolf came and attacked his sheep.",
            "He cried for help, but nobody came because nobody believed a liar."
        ],
        moral: "Liars are not believed even when they tell the truth!"
    },
    {
        title: "King Midas & The Golden Touch",
        image: "assets/images/stories/midas_gold.png",
        slides: [
            "King Midas wished that everything he touched would turn to gold.",
            "His wish was granted, and he turned flowers and tables into solid gold.",
            "When he tried to eat, his bread and water turned into hard gold.",
            "He hugged his daughter and she turned into a golden statue!",
            "Midas cried and begged to undo the wish, realizing love matters more than riches."
        ],
        moral: "Greed leads to disappointment; love is true wealth!"
    },
    {
        title: "The Ugly Duckling",
        image: "assets/images/stories/ugly_duckling.png",
        slides: [
            "A little duckling looked different from his brothers and was teased.",
            "He felt sad and wandered alone through the winter forest.",
            "When spring came, he saw beautiful white swans in the lake.",
            "Looking down at his reflection, he saw he was a graceful swan too!",
            "He flew happily with his new swan family."
        ],
        moral: "Do not judge by appearances; everyone is special!"
    },
    {
        title: "The Goose That Laid Golden Eggs",
        image: "assets/images/stories/golden_eggs.png",
        slides: [
            "A countryman owned a special goose that laid one golden egg every day.",
            "He became rich selling the golden eggs in the town market.",
            "Greedy for more gold, he thought the goose must have a mountain of gold inside.",
            "He foolishly harmed the goose, only to find it was just like any other bird.",
            "He lost his daily golden egg and was left with nothing."
        ],
        moral: "Thinking only of greed destroys blessings!"
    },
    {
        title: "Two Silly Goats",
        image: "assets/images/stories/two_goats.png",
        slides: [
            "Two goats met in the middle of a very narrow bridge over a river.",
            "The bridge was so narrow that only one goat could cross at a time.",
            "Neither goat wanted to step back and let the other pass first.",
            "They locked horns and fought stubbornly in the middle.",
            "Both goats lost their balance and fell into the rushing river below!"
        ],
        moral: "Anger and stubbornness lead to trouble; compromise is wise!"
    },
    {
        title: "The Milkmaid & Her Pail",
        image: "assets/images/stories/milkmaid_pail.png",
        slides: [
            "Patty the milkmaid carried a pail of fresh milk balanced on her head.",
            "She dreamed of selling milk to buy eggs, hatching chickens, and buying a dress.",
            "Imagining how she would toss her head at the party, she actually tossed her head!",
            "The pail fell, and all the milk spilled onto the green grass.",
            "All her grand daydreams vanished in an instant."
        ],
        moral: "Do not count your chickens before they hatch!"
    }
];

let currentStoryIndex = 0;
let currentSlideIndex = 0;

function loadStorySelect() {
    const selector = document.getElementById("storySelect");
    if (!selector) return;
    selector.innerHTML = "";
    stories.forEach((st, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = `${idx + 1}. ${st.title}`;
        selector.appendChild(opt);
    });
}

function selectStory(idx) {
    currentStoryIndex = parseInt(idx);
    currentSlideIndex = 0;
    renderSlide();
}

function renderSlide() {
    const story = stories[currentStoryIndex];
    const titleElem = document.getElementById("storyTitle");
    const imgElem = document.getElementById("storyImage");
    const textElem = document.getElementById("storyText");
    const progressElem = document.getElementById("storyProgress");
    const endCard = document.getElementById("storyEndCard");

    if (titleElem) titleElem.textContent = story.title;
    if (imgElem) {
        imgElem.src = story.image;
        imgElem.onerror = function() { this.src = 'assets/images/stories/tortoise_hare.png'; };
    }

    if (currentSlideIndex < story.slides.length) {
        if (endCard) endCard.style.display = "none";
        if (textElem) {
            textElem.style.display = "block";
            textElem.textContent = story.slides[currentSlideIndex];
        }
        if (progressElem) {
            progressElem.textContent = `Slide ${currentSlideIndex + 1} of ${story.slides.length}`;
        }
    } else {
        // Show Final Completion Card!
        if (textElem) textElem.style.display = "none";
        if (progressElem) progressElem.textContent = "Story Completed!";
        if (endCard) {
            endCard.style.display = "block";
            document.getElementById("storyMoral").textContent = story.moral;
        }
    }
}

function nextSlide() {
    const story = stories[currentStoryIndex];
    if (currentSlideIndex <= story.slides.length) {
        currentSlideIndex++;
        renderSlide();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
    }
}

function speakSlide() {
    const story = stories[currentStoryIndex];
    let textToSpeak = "";
    if (currentSlideIndex < story.slides.length) {
        textToSpeak = story.slides[currentSlideIndex];
    } else {
        textToSpeak = `Moral of the story: ${story.moral}`;
    }
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(utterance);
}

function claimStoryReward() {
    const story = stories[currentStoryIndex];
    alert(`Reward Claimed! +5 Stars for finishing "${story.title}"!`);

    let profile = (window.YellowPawsStorage && window.YellowPawsStorage.getProfile()) || JSON.parse(localStorage.getItem("yellowPawsProfile")) || {stars: 0};
    const newStars = (profile.stars || 0) + 5;
    if (window.YellowPawsStorage) {
        window.YellowPawsStorage.updateProfile({ stars: newStars });
        window.YellowPawsStorage.addHistory(`Completed story: ${story.title}`);
    } else {
        profile.stars = newStars;
        localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
    }

    // Go to next story or hub
    if (currentStoryIndex < stories.length - 1) {
        selectStory(currentStoryIndex + 1);
        document.getElementById("storySelect").value = currentStoryIndex;
    } else {
        window.location.href = "learninghub.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadStorySelect();
    renderSlide();
});
