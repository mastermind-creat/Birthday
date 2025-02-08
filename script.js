// Countdown Timer Setup
const countdownDate = new Date("Feb 10, 2025 00:00:00").getTime();
const countdownTimer = document.getElementById('countdown-timer');

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownTimer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If countdown is complete
    if (distance < 0) {
        clearInterval(timer);
        countdownTimer.innerHTML = "It's time to celebrate!";
    }
}, 1000);

// Song Lyrics Display Logic
const audioPlayer = document.getElementById('bg-music');
const verses = document.querySelectorAll('#songLyrics .verse');
const verseTimings = [0, 9, 20, 30, 40, 50, 70, 80, 90, 101, 110, 121, 130, 141, 150, 161, 170, 180, 190, 201, 210, 230, 241, 252, 301, 312, 322, 341]; // in seconds
let verseIndex = 0;

// Function to show the lyrics at the right time
function showVerseAtTime() {
    const currentTime = Math.floor(audioPlayer.currentTime);
    if (verseIndex < verses.length && currentTime >= verseTimings[verseIndex]) {
        verses[verseIndex].style.display = 'block'; // Show current verse
        if (verseIndex > 0) {
            verses[verseIndex - 1].style.display = 'none'; // Hide previous verse
        }
        verseIndex++;
    }
}

// Function to hide all verses
function hideAllVerses() {
    verses.forEach(verse => {
        verse.style.display = 'none'; // Hide all verses initially or when song stops
    });
}

// Event Listener for Audio Play
audioPlayer.addEventListener('play', function() {
    document.getElementById('songLyrics').style.display = 'block'; // Show lyrics container
    verseIndex = 0; // Reset to first verse
    hideAllVerses(); // Hide all initially
    const verseTimer = setInterval(showVerseAtTime, 1000); // Check every second for the right time to display lyrics

    // Stop the timer when the song ends or pauses
    audioPlayer.addEventListener('pause', function() {
        clearInterval(verseTimer);
        hideAllVerses();
    });
});

// Hide the lyrics when the audio is stopped
audioPlayer.addEventListener('ended', function() {
    hideAllVerses();
});
