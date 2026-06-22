// Utility to handle Speech Recognition for Pronunciation Assessment
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
} else {
    console.warn("Speech Recognition API not supported in this browser.");
}

function listenToPronunciation(expectedWord, callback) {
    if (!recognition) {
        alert("Sorry, your browser doesn't support the microphone for pronunciation.");
        return;
    }

    recognition.onresult = function(event) {
        const spokenWord = event.results[0][0].transcript.toLowerCase().trim();
        const cleanExpected = expectedWord.toLowerCase().trim();
        
        console.log("Expected:", cleanExpected, "Spoken:", spokenWord);
        
        let isCorrect = spokenWord.includes(cleanExpected) || cleanExpected.includes(spokenWord);
        
        callback(isCorrect, spokenWord);
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        alert("Couldn't hear you clearly. Please try again!");
    };

    recognition.start();
}
