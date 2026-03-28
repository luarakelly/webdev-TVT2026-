function triangleChecker(sideA, sideB, sideC) {
    let isValidTriangle = (sideA + sideB > sideC) && (sideA + sideC > sideB) && (sideB + sideC > sideA);

    if (!isValidTriangle) {
        return "Not a valid triangle!";
    }
    else if (sideA === sideB && sideB === c) {
        return "Equilateral triangle.";
    }
    else if (sideA === sideB || sideB === sideC || sideA === sideC) {
        return "Isosceles triangle.";
    }
    else {
        return "Scalene triangle.";
    }    
};

function display(triangleType) {
    document.getElementById('result').innerHTML = `
         The triangle type is: ${triangleType}
    `;
};

//Main program
let sideA = parseFloat(prompt('Enter triangle lenght a: '));
let sideB = parseFloat(prompt('Enter triangle lenght b: '));
let sideC = parseFloat(prompt('Enter triangle lenght b: '));

let triangleType = triangleChecker(sideA, sideB, sideC);
display(triangleType);