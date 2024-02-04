var table;             // Unit of table
var operator = 'multiplication'; // Type of calculation
var i = 1;                 // Set counter to 1
var msg = '<h2>Multiplication Table</h2>';              // Message

let numInput = prompt("Please enter a number from 0 - 10:"); // Prompt user for a number and save it to numInput
table = numInput; // Set table to user input

if (operator === 'multiplication') {
    // Do multiplication
    while (i < 11) {
        msg += i + ' x ' + table + ' = ' + (i * table) + '<br />';
        i++;
    }
}

// Write the message into the page
var el = document.getElementById('blackboard');
el.innerHTML = msg;