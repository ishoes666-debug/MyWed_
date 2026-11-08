
const openButton = document.getElementById("openButton");
const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitation");

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

// OPEN INVITATION + AUTOMATIC BACKGROUND MUSIC
openButton.addEventListener("click", async () => {

    // Start envelope animation
    envelope.classList.add("open");

    // Automatically play background music
    try {
        await music.play();

        musicButton.textContent = "♫ Music On";
        musicButton.classList.add("playing");

    } catch (error) {
        console.error("Music playback error:", error);
        musicButton.textContent = "♫ Music Off";
    }

    // Hide envelope and reveal invitation
    setTimeout(() => {
        envelopeScreen.style.transition = "opacity 1s";
        envelopeScreen.style.opacity = "0";

        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            invitation.classList.remove("hidden");
            window.scrollTo(0, 0);
        }, 1000);

    }, 900);
});


// BACKGROUND MUSIC CONTROL
musicButton.addEventListener("click", async () => {

    if (music.paused) {

        try {
            await music.play();

            musicButton.textContent = "♫ Music On";
            musicButton.classList.add("playing");

        } catch (error) {
            console.error("Music playback error:", error);
            musicButton.textContent = "♫ Music Off";
        }

    } else {

        music.pause();

        musicButton.textContent = "♫ Music Off";
        musicButton.classList.remove("playing");
    }
});


// COUNTDOWN
// Change this to your actual wedding date.
const weddingDate = new Date("December 12, 2027 14:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {

        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).textContent = "00";
        });

        return;
    }

    document.getElementById("days").textContent =
        Math.floor(difference / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
        Math.floor((difference / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").textContent =
        Math.floor((difference / (1000 * 60)) % 60);

    document.getElementById("seconds").textContent =
        Math.floor((difference / 1000) % 60);
}

updateCountdown();

setInterval(updateCountdown, 1000);


// RSVP FORM
document.getElementById("rsvpForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("guestName").value;
    const attendance = document.getElementById("attendance").value;

    document.getElementById("rsvpMessage").textContent =
        `Thank you, ${name}! Your response: ${attendance}.`;

    this.reset();
});
