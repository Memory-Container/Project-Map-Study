// src = "https://code.jquery.com/jquery-3.7.1.min.js";
// integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
// crossorigin = "anonymous";
const overlay = document.getElementById("overlay");
const lock = document.getElementById("lock");
const learn = document.getElementById("learn");
const lockChangeBackground = document.getElementById("lockChangeBackground");
const demo = document.getElementById("demo");

function openOverlay() {
    overlay.style.display = "flex";
}
function closeOverlay() {
    overlay.style.display = "none";
}
function chooseOverlay() {
    learn.style.display = "flex";
    overlay.style.display = "none";
    lock.style.display = "none";
    lockChangeBackground.style.display = "flex";
    demo.style.display = "none";
}
