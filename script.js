console.log("------------------Consuming Promises with ASYNC/AWAIT------");

const whereAmI = async () => {
  // Here we can have one or more AWAIT!
  // fetch function return a promise and we can wait of that result here!
  await fetch(`https://restcountries.com/v3.1/name/${country}`);
};
