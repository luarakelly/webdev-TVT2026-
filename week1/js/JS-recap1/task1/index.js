'use strict';

function convertToFahrenheit(c) {
    const celsius = parseFloat(c);
    return (celsius * 9/5) + 32;
};

function convertToKelvin(c) {
    const celsius = parseFloat(c);
    return celsius + 273.15;
};

function display(celsius, fahrenheit, kelvin) {
    document.getElementById("result").innerHTML =
        "Celsius: " + celsius + "°C<br>" +
        "Fahrenheit: " + fahrenheit.toFixed(2) + "°F<br>" +
        "Kelvin: " + kelvin.toFixed(2) + " K";
}

// Main program
let celsius = parseFloat(prompt("Enter temperature in Celsius:"));

let fahrenheit = convertToFahrenheit(celsius);
let kelvin = convertToKelvin(celsius);

display(celsius, fahrenheit, kelvin);

        