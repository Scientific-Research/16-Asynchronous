console.log("------------------Consuming Promises with ASYNC/AWAIT------");
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = (data, className = "") => {
  const html = `<article class="country ${className}">
  <img class="country__img" src=${data.flags.png} />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${Number(
    data.population / 1000000
  ).toFixed(1)}M people
  </p>
  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
  <p class="country__row"><span>💰</span>${
    Object.values(data.currencies)[0].name
  }</p>
  </div>
  </article>`;

  // form.insertAdjacentHTML("afterend", html);
  // Here we have class countries as parent of our html here instead of form. We don't have form here!
  countriesContainer.insertAdjacentHTML("beforeend", html);

  // To meke it appear on the page, we have to change the opacity to 1:
  // I added to finally and commented it out here, because anyway it has to be happen no matter of success for promise or a failed promise!
  countriesContainer.style.opacity = 1;
};

const getJSON = (url, errorMsg = "Something went wrong!") => {
  // NOTE: I have to return the fetch method => In this case, it return Promise like other then methods and therefore, I can chain it to other then methods below!
  return fetch(url).then((response) => {
    console.log(response);
    // If we give a correct country name, we will get response.ok:true and response.status: 200
    // If we give an incorrect country name, we will get response.ok:false and response.status:404

    // when the response.ok is false, the promise which is returns from then method is rejected and the current then method terminates immediately! This rejected promise will propagate all the way down to the catch() handler below!

    // The err.message that we see in catch() handler gets exactly the below message => Counry not found! ${response.status} and display it on the page!
    if (!response.ok) {
      // throw is like return, it returns the error!
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};

const renderError = (msg) => {
  // It does the same like insertAdjacentHtml but with text, that's why i added the msg to that(last time a html file added with insertAdjacentHtml)
  countriesContainer.insertAdjacentText("beforeend", msg);
  // I added to finally and commented it out here, because anyway it has to be happen no matter of success for promise or a failed promise!
  countriesContainer.style.opacity = 1; // In this case, the container would be visible => The TEXT or ERROR Message would be visible on the page!
};

// btn.addEventListener("click", () => {
//   whereAmI();
// });

// OR, because our function => whereAmI(); get no input parameter, we can write the above function simpler as following:

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// async => using async to this function, we make it a special function => a function which is keep running in the background while performing the code inside of it and when is done, it returns a promise!
// NOTE: ASYNC and AWAIT is only about consuming the Promises - The way we build them is not influence anyway!
// const whereAmI = async (country) => {
const whereAmI = async () => {
  try {
    // Geolocation:
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding:
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) {
      throw new Error("Problem getting location data!");
    }

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Here we can have one or more AWAIT statements!
    // after writing await word, we need a promise, which can come from a fetch function => fetch function return a promise and we can await of that result here!
    // AWAIT, wait for the result of the fetch function => it stops the code execution at this point until the promise is fullfilled(untill the data has been fetched in this case!)

    // Country data:
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    if (!res.ok) {
      throw new Error("Problem getting Country!");
    }

    const data = await res.json(); // this returns a new promise and previously we have to continue with .then chain! BUT NOW; we have to AWAIT this and assign it to a new variable! JUST THAT!!!
    console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;

    // QUESTION: IS AWAIT BLOCK OUR CODE IN THIS POINT: OF COURSE NOT! Stopping the execution of an async function in this point is not a problem because the async function is running asynchrounsly in the background, therefore it is not blocking the main thread of execution! and that is special about the async await function which is look like a regualr sync function but in fact in background is running asynchronously!

    // As soon as fetch function is resolved(the results of fetching are there), then the result of whole process including await is resolved too and we can store that in a variable like res which is response!
    // console.log(res);

    // NOTE: Async && Await are in fact simply syntatic sugar over the .then method in Promises!
    // ABOVE ASYNC AND AWAIT ARE EQUIVALENT OF BELOW FETCH AND .THEN:
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then((res) =>
    //   console.log(res)
    // );
  } catch (err) {
    console.error(`${err}☠️`);
    renderError(`Something went wrong ☠️! ${err.message}`);

    // Reject promise returned from async function:
    throw err; // In this case, when there is an error in line 116, the catch() method in line 117 will catch it, otherwise, it will not catch that!
  }
};
console.log("1: Will get location");

// whereAmI("portugal");
// const city = whereAmI(); // JS in this point has no idea what will return from this function back, because this function is still running asyncoronously in background and is not finished yet => Therefore, we get a promose here which is pending and it means it is not fullfilled yet! THE FULLFILLED VALUE WHICH RETURNES THE FUNCTION LATER WOULD BE THIS STRING THAT WE ARE EXPECTING:

// You are in ${dataGeo.city} ${dataGeo.counry}
// console.log(city); // Promise {<pending>}

// QUESTION: HOW WE CAN GET THIS STRING AS FULLFILLED VALUE FROM THIS ASYNC FUNCTION:
// WE CAN NOT USE HERE ASYNC AND AWAIT ANYMORE, RATHER, WE USE LIKE BEFORE, .then() and .catch() METHODS:
whereAmI()
  .then((string) => console.log(`2: ${string}`)) // You are in Berlin Germany
  .catch((err) => console.log(`2: ${err.message} ☠️☠️`))
  // finally is executed anyway and as the last operation, that's why we see the execution order 1, 2, 3
  .finally(() => console.log("3: Finished getting location"));

// console.log("3: Finished getting location")

// NOW, WE HAVE A MIX OF async, await and .then() methods! I WOULD LIKE TO HAVE ALL OF THEM ONLY WITH async and await! QUESTION: HOW CAN I DO THAT?

// CONVERTING THE .then() PART TO async AND await => USING IIFE TO IMPLEMENT AND CALL TAHT:
(async () => {
  try {
    const string = await whereAmI();
    console.log(string); // You are in Berlin, Germany
  } catch (err) {
    console.log(`${err.message} ☠️`);
  }
  console.log("3: Finished getting location");
})(); // with these two open and close Parantheses, we call an IIFE function!

// console.log("FIRST"); // this will be displayed first because whereAmI is an async function and is running in the background without blocking our main thread and code will move on to the next line which is this line here and publish 'FIRST' at console!

// NOTE: Before that we have to mess up with .then methods and callback hells, but now, all of the are gone and we have a elegant way of writing the async function using async and await keywords and our code looks like a regular sync function and we assign the result of the resolved Promise to a new variable exactly like a regular sync function!

// btn.addEventListener("click", whereAmI);

// NOTE: WE CAN USE TRY-CATCH() to catch the errors in async-await functions, but try-catch has nothing to do with async-await and it was from beginning of JS. WE CAN NOT USE .CATCH() ANYMORE BECAUSE WE CAN NOT ATTACH IT TO THE .then METHOD ANYMORE, BECAUSE THERE IS NO .then METHOD HERE ANYMORE => THAT'S WHY WE HAVE TO USE TRY-CATCH HERE!

console.log("-------------------TRY-CATCH BLOCK----------------------------");

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.log("You can not assign a value to a constant!");
//   // alert(err.message); // Assignment to constant variable!
// }

console.log("-------------Returning values from ASYNC Functions------------");

console.log("------------- RUNNING PROMISES IN PARALLEL--------------------");

// Imagine that we want to get the data from 3 different countries at the same time and order of received data doesn't matter at all:
// RUNNING PROMISES IN PARALLEL:

const get3Countries = async (c1, c2, c3) => {
  // In an async function, we need to wrap up our function in a try-catch block
  // NOTE: NEVER WORK A ASYNC FUNCTION WITHOUT TRY-CATCH BLOCK:

  try {
    const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.log(err);
  }
};

get3Countries("portugal", "canada", "tanzania");
