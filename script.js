"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = (data) => {
  const html = `<article class="country">
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
        renderCountry(data2);
      });
    });
  });
};

// It depends, the info for which Country arrives sooner, therefore, addEventListener will listen to that and the info are loaded completely for this country, then the cakll back function will be called and the info for this country will be shown!

// That's why when i reload every time the page, the sequence for the flags of countries will change and the order of displaying the flah will change and is not fiexd! In this case, we can not control or set which flag comes first and which comes later! It depends the info of which country is arrived from the ONLINE-API sooner!

// getCountryAndNeighbour("portugal", "germany", "usa");
getCountryAndNeighbour("portugal");

// NOTE: OR USING REST OPERATOR TO PUT ALL THE COUNTRIES TOGETHRE AN AN ARRAY AND WE NO LONGER NEED TO CALL EVERY COUNTRY SEPARATELY!
// getCountryData("germany");
// getCountryData("usa");
