"use strict";

console.log("-------------BUILDING A SIMPLE PROMISE--------------------------");

// This is like the fetch function which also creates a new Promise!
const lotteryPromise = new Promise((resolve, reject) => {
  if (Math.random() >= 0.5) {
    resolve("YOU WIN 💰");
  }
  reject("You lost your money 💩");
});

// A promise is a special kind of an object, that's why lotteryPromise variable would be an object too and we can call a then method on that:
lotteryPromise.then((res) => console.log(res)).catch((err) => console.err(err));
