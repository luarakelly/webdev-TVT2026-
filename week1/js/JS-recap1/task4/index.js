function grade(score) {
    if(score < 39){
        return 0;
    } else if (score < 51){
        return 1;
    } else if (score < 63){
        return 2;
    } else if (score < 75){
        return 3;
    } else if (score < 87){
        return 4;
    } else return 5;
};

function display(score) {
    document.getElementById('grade').innerHTML = `
        Your grade is: ${grade(score)};
    `;
};

// Main program
let score = parseFloat(prompt('Enter your total ammount of score to get the course grade: '));
display(score);
