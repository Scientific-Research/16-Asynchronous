"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

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
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
              </div>
              </article>`;

  // form.insertAdjacentHTML("afterend", html);
  // Here we have class countries as parent of our html here instead of form. We don't have form here!
  countriesContainer.insertAdjacentHTML("beforeend", html);

  // To meke it appear on the page, we have to change the opacity to 1:
  countriesContainer.style.opacity = 1;
};

// const getCountryData = (...country) => {
const getCountryAndNeighbour = (...country) => {
  console.log(country); // ['portugal', 'germany', 'usa']

  // Using forEach only because of the REST operator and created Array above:
  country.forEach((country) => {
    // There are multiple ways of doing AJAX calls in JS => we start with the most old school one which is XMLHttpRequest function:
    // AJAX call country 1
    const request = new XMLHttpRequest();
    // Request is an object => Type of httpRequest to get the data is GET!
    // https://github.com/public-apis/public-apis
    // request.open("GET", "https://restcountries.com/v3.1/name/portugal");
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send(); // => This send our GET request to the above URL!

    // console.log(request.responseText); We will have here nothing

    // The responseText will be accessible after the request has loaded
    // NOTE: We have to use here a regular description function, otherwise, this keyword inside it will not work(exactly the same when we use arrow function)
    request.addEventListener("load", function () {
      // console.log(request.responseText); // OR using this keyword points to the request
      console.log(this.responseText); // this keyword refers to request object directly!

      // this.responseText is in JSON format which is a big string of text and what we need is JS actual object! Therfore, we have to use JSON.parse() to convert the JSON string text to JS obejcts!

      const [data] = JSON.parse(this.responseText);
      console.log(data); // Now, we have an array containing an object full of info about Germany, therefore, we can destructure this object => after destructuring, we get only the object inside the array and no longer array is there!

      // WITHOUT DESTRUCTURING, WE HAVE TO WRITE AS FOLLOWING: => BUT DESTRUCTURING IS MUCH MORE BEAUTIFUL THAN USING INDEXING IN AN ARRAY:
      const data2 = JSON.parse(this.responseText)[0];
      console.log(data2);

      // Now, we call this function:
      // Render country 1
      renderCountry(data);

      // Get neighbour country (2):

      // const neighbour = data.borders[0]; // read the first neighbour in the array!
      const [neighbour] = data.borders; // read the first neighbour using destructuring

      // A country without neighbour
      if (!neighbour) return;
      console.log(neighbour);

      // AJAX call country 2
      const request2 = new XMLHttpRequest();
      request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send(); // => This send our GET request to the above URL!

      // we have now a new addEventListener and na new callback inside another one which is above addEventListener => in other words, the second request is inside the first request:
      // NOTE: We have to use here a regular description function, otherwise, this keyword inside it will not work(exactly the same when we use arrow function)
      request2.addEventListener("load", function () {
        console.log(this.responseText); // OR console.log(request2.responseText);
        // This data is in JSON format => a big string of Text

        const [data2] = JSON.parse(this.responseText); // we need JS real objects, therefore, we have to use JSON.parse() to convert the data from JSON string text to Objects!
        console.log(data2);

        // NOTE: NO MATTER HOW MANY TIMES I RELOAD THE PAGE, SPAIN COMES ALWAYS AFTER PORTUGAL! => IT MEANS WE HAVE SEQUENCE(ORDER) HERE!

        // Render country 2 => Spain
        renderCountry(data2, "neighbour"); // There is a special class when the country is neighbour => class="country ${className}"

        // NOTE: BUT IMAGINE THAT WE WANTED TO DISPLAY THE NEIGHBOUR OF THE NEIGHBOUR OF THE ... => 10 LEVELS OF NEIGBOURS, THEREFORE WE HAVE TO GO INSIDE A NESTED CALLBACK FUNCTION FOR 10 TIMES => WE NEED HERE AT THE END A *** CALL BACK HELL *** => WHEN WE HAVE A LOT OF NESTED CALL BACKS IN ORDER TO EXECUTE ASYNC TASKS IN SEQUENCE!
      });
    });
  });
};

// It depends, the info for which Country arrives sooner, therefore, addEventListener will listen to that and the info are loaded completely for this country, then the cakll back function will be called and the info for this country will be shown!

// That's why when i reload every time the page, the sequence for the flags of countries will change and the order of displaying the flah will change and is not fiexd! In this case, we can not control or set which flag comes first and which comes later! It depends the info of which country is arrived from the ONLINE-API sooner!

// getCountryAndNeighbour("portugal", "germany", "usa");
// getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("usa"); // IT SHOWS US THE CANADA AS NEIGHBOUR COUNTRY

// NOTE: OR USING REST OPERATOR TO PUT ALL THE COUNTRIES TOGETHRE AN AN ARRAY AND WE NO LONGER NEED TO CALL EVERY COUNTRY SEPARATELY!
// getCountryData("germany");
// getCountryData("usa");

// NOTE: A CALLBACK HELL AS FOLLOWING: => WE HAVE 5 setTimeOut() functions INSDIE ANOTHER ONE!
// CALL BACK HELL IS PRETTY EASY IDENTIFY BY TRIANGUALR SHAPE(INDENTATION) WHICH FORMED AT THE LEFT SIDE!
// THE PROBLEM WITH CALLBACK HELL IS THAT: IT IS DIFFICULT TO UNDERSTAND AND IT MAKES OUR CODE MESSY

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

console.log("------------------PROMISES-----------------------");

// const country = "germany";
// const request = fetch(`https://restcountries.com/v3.1/name/${country}`);
// console.log(request); // Promise {<pending>}

// We get immediately Promise, what is Promise:
// An object that is used as a placeholder for the future result of an asynchronous operation.
// LESS INFORMAL: A container for an async delivered value OR A container for a future value!
// Value: Example: Response from AJAX call!

// NOTE: Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell :)

// const getCountryData = function (country) {
//   // the fetch returns a promise immediately as Pending state!
//   // On all promises, we can call then method! We pass in then method a callback function which will be executed as soon as the promise is fulfilled(the results are there!)
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       console.log(response);
//       return response.json(); // all resolved responses have json() method on fetch() and json() method returns a promise too!
//     })
//     .then((data) => {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData("germany");

// NOTE: SECOND VERSION => very simplified one:
// const getCountryData2 = function (country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => renderCountry(data[0]));
// };

// getCountryData2("germany");

const getCountryData2 = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      // get the neighbour countries:
      // Firts AJAX call:
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      // Second AJAX call:
      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then((response) => response.json())
        .then((data) => renderCountry(data[0], "neighbour"));
    });
};

getCountryData2("germany");

console.log("------------------------CHAINING PROMISES---------------------");

// using chaining promises to render neighbour countries besides initial country:
