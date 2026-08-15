function askQuestion() {
    const inputField = document.getElementById("chatInput");
    const question = inputField.value.trim();
    if (!question) return;

    const chatLog = document.getElementById("chatLog");
    
    // Add user question
    const userMsg = document.createElement("p");
    userMsg.innerHTML = `<strong>You:</strong> ${question}`;
    chatLog.appendChild(userMsg);
    
    inputField.value = "";
    
    // Mock AI Response
    setTimeout(() => {
        const aiMsg = document.createElement("p");
        let response = "That's a very interesting question! Learning is so much fun.";
        
        const qLower = question.toLowerCase();
        
        // Allowed keywords related to learning app modules
        const educationalKeywords = ["lion", "sky", "blue", "dog", "cat", "apple", "number", "color", "shape", "animal", "letter", "count", "read", "star", "math", "hello", "hi"];
        
        const isEducational = educationalKeywords.some(kw => qLower.includes(kw));

        if (!isEducational) {
            response = "Hmm, I don't know much about that! I am YellowPaws, and I only teach about animals, colors, shapes, numbers, and letters. Please ask me something about what we are learning!";
        } else if (qLower.includes("lion")) {
            response = "A lion is a big wild cat, known as the king of the jungle!";
        } else if (qLower.includes("sky") && qLower.includes("blue")) {
            response = "The sky is blue because sunlight scatters in the atmosphere, and blue light scatters the most!";
        } else if (qLower.includes("dog")) {
            response = "Dogs are very friendly animals and are known as man's best friend!";
        } else if (qLower.includes("cat")) {
            response = "Cats are cute, fluffy animals that love to sleep and say 'Meow'!";
        }
        
        aiMsg.innerHTML = `<strong>AI Tutor:</strong> ${response}`;
        chatLog.appendChild(aiMsg);
        chatLog.scrollTop = chatLog.scrollHeight;
    }, 1000);
}

document.getElementById("chatInput")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        askQuestion();
    }
});
