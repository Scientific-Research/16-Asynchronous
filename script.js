"use strict";

console.log("--------------------THE EVENT LOOP IN PRACTICE----------------");

console.log("Test start to the Console....");

// After 0 second, call back function will be fired and will be put in callback queue!
setTimeout(() => {
  console.log("0 sec timer!");
}, 0);

// The Promise which is immediately resolved! The successful one which is immediately resolved!
Promise.resolve("Resolved Promise 1").then((res) => console.log(res));

Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log("Test end");

// The order of execution:
// Test start to the Console....
// Test end
// Resolved Promise 1 => MicroTask Queue => has priority over the callback queues
// 0 sec timer! => Regular Callback Queue

// NOTE: THE PROBLEM IS: WHEN WE HAVE A BIG TASK IN MICROTASK QUEUE and it takes for example 5 seconds, the setTimeout() which executes after that, will not be executed after 0 sec, rather, it will be executed after 5 seconds, because call back function in MICROTASK QUEUE takes 5 seconds! => we can experiment that with a for loop above!

// RESULT: AS WE SEE ABOVE THAT THE TIMER WITH 0 SECOND WHICH MUST BE EXECUTED IMMEDIATELY AFTER EXECUTION OF CALLBACK FUNCTION IN MICROTASK QUEUE, BECAUSE IT IS A 0 sec TIMER, WILL EXECUTE A WHILE AFTER THE EXECUTION OF CALLBACK FUNCTION IN MICROTASK QUEUE => THERE IS NO GUARANTI, THEFORE WE CAN NOT USE JS TO CREATE A HIGH-PRECISION TIMERS!
