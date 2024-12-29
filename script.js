"use strict";

console.log("-------------BUILDING A SIMPLE PROMISE--------------------------");

// This is like the fetch function which also creates a new Promise!
const lotteryPromise = new Promise((resolve, reject) => {
  if (Math.random() >= 0.5) {
    resolve("YOU WIN 💰");
  }
  reject("You lost your money 💩");
});
