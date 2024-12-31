console.log("------------------Consuming Promises with ASYNC/AWAIT------");

// async => using async to this function, we make it a special function => a function which is keep running in the background while performing the code inside of it and when is done, it returns a promise!
const whereAmI = async (country) => {
  // Here we can have one or more AWAIT statements!
  // after writing await word, we need a promise, which can come from a fetch function => fetch function return a promise and we can await of that result here!
  // AWAIT, wait for the result of the fetch function => it stops the code execution at this point until the promise is fullfilled(untill the data has been fetched in this case!)
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

  // QUESTION: IS AWAIT BLOCK OUR CODE IN THIS POINT: OF COURSE NOT! Stopping the execution of an async function in this point is not a problem because the async function is running asynchrounsly in the background, therefore it is not blocking the main thread of execution! and that is special about the async await function which is look like a regualr sync function but in fact in background is running asynchronously!

  // As soon as fetch function is resolved(the results of fetching are there), then the result of whole process including await is resolved too and we can store that in a variable like res which is response!
};
