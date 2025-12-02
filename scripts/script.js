let lenBtn = document.getElementById("len-btn");
let tempBtn = document.getElementById("temp-btn");
let weightBtn = document.getElementById("weight-btn");

let lengthTab = document.querySelector(".length");
let weightTab = document.querySelector(".weight");
let temperatureTab = document.querySelector(".temperature");

function openConverter(event, tabName) {
    // Hide all tabs
    lengthTab.style.display = "none";
    weightTab.style.display = "none";
    temperatureTab.style.display = "none";

    // Remove active class from all buttons
    lenBtn.classList.remove("active");
    tempBtn.classList.remove("active");
    weightBtn.classList.remove("active");

    // Show the selected tab and add active class to the clicked button
    document.querySelector(`.${tabName.toLowerCase()}`).style.display = "block";
    event.currentTarget.classList.add("active");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".box").classList.toggle("dark-mode");
    lenBtn.classList.toggle("dark-mode");
    tempBtn.classList.toggle("dark-mode");
    weightBtn.classList.toggle("dark-mode");
    document.querySelectorAll(".convert-btn").forEach(btn => {
        btn.classList.toggle("dark-mode");
    });
    document.querySelector(".image").classList.toggle("dark-mode");
}

let darkBtn = document.querySelector(".dark-btn");
darkBtn.addEventListener("click", toggleDarkMode);

// Add event listeners to buttons
lenBtn.addEventListener("click", (event) => openConverter(event, "Length"));
tempBtn.addEventListener("click", (event) => openConverter(event, "Temperature"));
weightBtn.addEventListener("click", (event) => openConverter(event, "Weight"));

// Set default tab
lenBtn.click();