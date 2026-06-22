let selectedAvatar = "";

function selectAvatar(avatar) {
    selectedAvatar = avatar;
    document.querySelectorAll(".avatar").forEach(item => {
        item.classList.remove("selected");
        if(item.textContent === avatar){
            item.classList.add("selected");
        }
    });
}

function saveProfile() {
    const nickname = document.getElementById("nickname").value;

    if (nickname.trim() === "" || selectedAvatar === "") {
        alert("Please choose an avatar and enter a nickname!");
        return;
    }

    const profile = {
        nickname: nickname,
        avatar: selectedAvatar,
        stars: 0,
        quizCount: 0
    };

    localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));

    document.getElementById("message").textContent = `🎉 Welcome ${nickname}!`;
    document.getElementById("message").style.color = "green";

    setTimeout(() => {
        window.location.href = "learninghub.html";
    }, 1500);
}