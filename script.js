"use strict";

console.log("--------------------THE EVENT LOOP IN PRACTICE----------------");

console.log("Test start to the Console....");

// After 0 second, call back function will be fired and will be put in callback queue!
setTimeout(() => {
  console.log("0 sec timer!");
}, 0);

// The Promise which is immediately resolved! The successful one which is immediately resolved!
Promise.resolve("Resolved Promise 1").then((res) => console.log(res));
console.log("Test end");

// The sequence of execution:
// Test start to the Console....
// Test end
// Resolved Promise 1
// 0 sec timer!
