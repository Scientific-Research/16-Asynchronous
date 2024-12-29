"use strict";

console.log("-------------BUILDING A SIMPLE PROMISE--------------------------");

// This is like the fetch function which also creates a new Promise!
const lotteryPromise = new Promise((resolve, reject) => {
  console.log("Lottery draw is happening 🎉");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("YOU WIN 💰"); // will appear in then() method as a resolved Promise
    } else {
      // reject("You lost your money 💩"); // will appear in catch() method as a rejected Promise
      reject(new Error("You lost your money 💩")); // will appear in catch() method as a rejected Promise
    }
  }, 2000);
});

// A promise is a special kind of an object, that's why lotteryPromise variable would be an object too and we can call a then method on that:
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// A more REALISTIC Example => Promisifying setTimeout
const wait = (seconds) => {
  // We don't need the reject here, because a Timer will never fail, Therefore, we don't need to write it here! Promise is like array method(map) => In map, there are three parameters, but most of the time, we need one or maximum 2 of them!

  // Callback function here would be simply resolve and we don't need to pass in any value in resolve function like above, This is not mandatory for a resolve function => NO resolved values are needed! We just need to wait our resolve() function with a certain amount of time here!
  // resolve function will be executed for example after 2 seconds!
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

// CONSUME THE PROMISE: This create a promise which waits for 2 seconds and after that our Promise is resolved! Inside then method, we don't have any value because Timer doesn't deliver any value! We just need to display something in console.log() or we can run any code there that should be executed after 2 seconds!
wait(2)
  .then(() => {
    console.log("I waited for 2 seconds!");
    return wait(1);
  })
  .then(() => console.log("I waited for 1 second!"));

// WE HAVE ABOVE AGAIN A NICE CHAIN OF ASYNCHRONOUS BEHAVIOUR THAT HAPPENS NICELY IN A SEQUENCE AND ALL WITHOUT THE CALLBACK HELL!

// NOTE: WE can do the above strategy for below CALLBACK HELL:
// THE SOLUTION TO THE CALLBACK HELL IS USING PROMISES WHICH IS AVAILABLE IN ES6!
// setTimeout(() => {
//   console.log("1 second passed!");
//   setTimeout(() => {
//     console.log("2 second passed!");
//     setTimeout(() => {
//       console.log("3 second passed!");
//       setTimeout(() => {
//         console.log("4 second passed!");
//         setTimeout(() => {
//           console.log("5 second passed!");
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// THE SOLUTION USING A NICE CHAIN OF ASYNCHRONOUS BEHAVIOUR:
const wait2 = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

wait2(1)
  .then(() => {
    console.log("-----I waited for 1 seconds!----");
    return wait(1);
  })
  .then(() => {
    console.log("-----I waited for 2 seconds!----");
    return wait(1);
  })
  .then(() => {
    console.log("-----I waited for 3 seconds!----");
    return wait(1);
  })
  .then(() => {
    console.log("-----I waited for 4 seconds!----");
    return wait(1);
  })
  .then(() => {
    console.log("-----I waited for 5 seconds!----");
    // return wait(1); // There is no further then() method, therfore, we don't need to return the wait(1)!
  });
