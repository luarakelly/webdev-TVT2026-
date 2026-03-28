function display(x1, y1, x2, y2) {
    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    document.getElementById('result').innerHTML = `
        The distance between coords: ${distance.toFixed(2)}        
    `;
}

// Main program
let x1 = parseFloat(prompt("Enter coord x1:"));
let y1 = parseFloat(prompt("Enter coord y1:"));
let x2 = parseFloat(prompt("Enter coord x2:"));
let y2 = parseFloat(prompt("Enter coord y2:"));

display(x1, y1, x2, y2);