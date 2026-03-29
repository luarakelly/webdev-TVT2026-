function numberInput() {
    let numbers = [];
    let input;

    do {
        input = prompt("Enter a number (or 'done' to finish):");

        if (input !== null && input.toLowerCase() !== "done") {
            let num = parseFloat(input);

            if (isNaN(num)) {
                alert(`"${input}" is not a valid number. Please enter only numbers.`);
                continue;
            }

            numbers.push(num);
        }

    } while (input !== null && input.toLowerCase() !== "done");

    return numbers;
}

function extractEvenNumbers(numbersArr) {
    let evenNumbers = [];

    for (let num of numbersArr) {
        if (num % 2 === 0) {
            evenNumbers.push(num);
        }
    }

    return evenNumbers;
}

function display(evenNumbers) {
    const resultElement = document.getElementById("result");

    if (evenNumbers.length === 0) {
        resultElement.innerHTML = "Even Numbers: None";
    } else {
        resultElement.innerHTML = `Even Numbers: ${evenNumbers.join(", ")}`;
    }

    resultElement.innerHTML += "<br>Program finished.";
}

// Main program
const userInput = numberInput();
const evenNumbers = extractEvenNumbers(userInput);
display(evenNumbers);