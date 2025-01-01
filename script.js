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

    console.log(data1.capital, data2.capital, data3.capital); // ['Lisbon'] ['Ottawa'] ['Dodoma']

    // We don't need to execute all these three links in a sequence. We can execute them in parallel and save the time:
    // Promise.all takes an array of promises and it will return a new promise(a new array) => It runs all the Promises in the array at the same time!
    const data = await Promise.all([
      await getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      await getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      await getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    // data.forEach((country) => {
    // console.log(country[0].capital); OR
    data.forEach((country) => {
      console.log(...[country[0].capital[0]]); // ['Lisbon'] ['Ottawa'] ['Dodoma'] They are loaded now in parallel and not in sequence
    });

    // OR we van use the map to get an array at the end =>
    data.map((country) => console.log(country[0].capital));

    // OR
    console.log(data.map((country) => country[0].capital[0]));
  } catch (err) {
    console.log(err);
  }
};

get3Countries("portugal", "canada", "tanzania");
