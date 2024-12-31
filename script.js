console.log("------------------Consuming Promises with ASYNC/AWAIT------");

// async => using async to this function, we make it a special function => a function which is keep running in the background while performing the code inside of it and when is done, it returns a promise!
const whereAmI = async (country) => {
  // Here we can have one or more AWAIT statements!
  // after writing await word, we need a promise, which can come from a fetch function => fetch function return a promise and we can await of that result here!
  // AWAIT, wait for the result of the fetch function => it stops the code execution at this point until the promise is fullfilled(untill the data has been fetched in this case!)
  await fetch(`https://restcountries.com/v3.1/name/${country}`);

  // QUESTION: IS AWAIT BLOCK OUR CODE IN THIS POINT: OF COURSE NOT! in a async function the function is running in the background!
};
