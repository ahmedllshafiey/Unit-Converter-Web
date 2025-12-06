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

// Main convert function
function convertUnits() {
    const activeTab = document.querySelector(".tablinks.active").id;
    const inputField = document.querySelector(`.${activeTab.includes("len") ? "length" : activeTab.includes("temp") ? "temperature" : "weight"} .input`);
    const value = parseFloat(inputField.value);
    const resultField = document.querySelector(".result-value");

    if (isNaN(value)) {
        resultField.textContent = "Please enter a valid number.";
        return;
    }

    let fromUnit, toUnit, result;

    // ----- LENGTH -----
    if (activeTab === "len-btn") {
        fromUnit = document.querySelector("#len-units").value;
        toUnit = document.querySelector("#len-units-to").value;

        const toMeters = {
            meters: v => v,
            kilometers: v => v * 1000,
            miles: v => v * 1609.34,
            feet: v => v * 0.3048
        };

        const fromMeters = {
            meters: v => v,
            kilometers: v => v / 1000,
            miles: v => v / 1609.34,
            feet: v => v / 0.3048
        };

        result = fromMeters[toUnit](toMeters[fromUnit](value));
    }

    // ----- WEIGHT -----
    if (activeTab === "weight-btn") {
        fromUnit = document.querySelector("#weight-units-from").value;
        toUnit = document.querySelector("#weight-units-to").value;

        const toGrams = {
            kilograms: v => v * 1000,
            grams: v => v,
            pounds: v => v * 453.592,
            ounces: v => v * 28.3495
        };

        const fromGrams = {
            kilograms: v => v / 1000,
            grams: v => v,
            pounds: v => v / 453.592,
            ounces: v => v / 28.3495
        };

        result = fromGrams[toUnit](toGrams[fromUnit](value));
    }

    // ----- TEMPERATURE -----
    if (activeTab === "temp-btn") {
        fromUnit = document.querySelector("#temp-units-from").value;
        toUnit = document.querySelector("#temp-units-to").value;

        const celsius = {
            celsius: v => v,
            fahrenheit: v => (v - 32) * (5 / 9),
            kelvin: v => v - 273.15
        };

        const fromCelsius = {
            celsius: v => v,
            fahrenheit: v => (v * 9 / 5) + 32,
            kelvin: v => v + 273.15
        };

        result = fromCelsius[toUnit](celsius[fromUnit](value));
    }

    resultField.textContent = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

// Add event to convert button
document.querySelector(".convert-btn").addEventListener("click", convertUnits);
