// script.js
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.textContent = '00:00:00';
    lapCount = 1;
    lapsList.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function recordLap() {
    if (running) {
        let lapTime = formatTime(difference);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
