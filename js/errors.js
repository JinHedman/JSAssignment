
// ReferenceError, using something that doesn’t exist
console.log(message);
sayHello();


// TypeError, using the wrong type of value
let num = 5;
num.toUpperCase();


// SyntaxError, typo or missing symbol
/*
function sayHello( {
  console.log("Hello!");
}
*/


//RangeError, value out of range
let arr = new Array(-5);


// DOM error example, element not found
let button = document.getElementById("startButton"); // returns null
button.addEventListener("click", () => { // TypeError: cannot read 'addEventListener' of null
  document.getElementById("output").textContent = "Clicked!";
});

// Error inside a called function
function greet(name) {
  // trying to use a method that doesnt exist on undefined
  console.log(name.toUpperCase());
}

function startGreeting() {
  let userName;
  greet(userName);
}

startGreeting();
