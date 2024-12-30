console.log("------------------Consuming Promises with ASYNC/AWAIT------");

const whereAmI = async () => {
  // Here we can have one or more AWAIT!
  await fetch(`https://restcountries.com/v3.1/name/${data.country}`);
};
