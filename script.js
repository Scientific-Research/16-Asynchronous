"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const getCountryData = (country) => {
  // There are multiple ways of doing AJAX calls in JS => we start with the most old school one which is XMLHttpRequest function:
  const request = new XMLHttpRequest();
  // Request is an object => Type of httpRequest to get the data is GET!
  // https://github.com/public-apis/public-apis
  // request.open("GET", "https://restcountries.com/v3.1/name/portugal");
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // => This send our GET request to the above URL!

  // console.log(request.responseText); We will have here nothing

  // The responseText will be accessible after the request has loaded
  request.addEventListener("load", function () {
    // console.log(request.responseText); // OR using this keyword points to the request
    console.log(this.responseText); // this keyword refers to request object directly!

    // this.responseText is in JSON format which is a big string of text and what we need is JS actual object! Therfore, we have to use JSON.parse() to convert the JSON string text to JS obejcts!

    const [data] = JSON.parse(this.responseText);
    console.log(data); // Now, we have an array containing an object full of info about Germany, therefore, we can destructure this object => after destructuring, we get only the object inside the array and no longer array is there!

    // WITHOUT DESTRUCTURING, WE HAVE TO WRITE AS FOLLOWING: => BUT DESTRUCTURING IS MUCH MORE BEAUTIFUL THAN USING INDEXING IN AN ARRAY:
    const data2 = JSON.parse(this.responseText)[0];
    console.log(data2);

    const html = `<article class="country">
  <img class="country__img" src=${data.flags.png} />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(
              data.population / 1000000
            ).toFixed(2)}M people
            </p>
            <p class="country__row"><span>🗣️</span>${data.languages.deu}</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
            </div>
            </article>`;

    // data.currencies.EUR.name
    // const currencies = data.currencies;
    // const currency = Object.values(currencies)[0]; // Get the first currency object

    // const currencyInfo = `<p class="country__row"><span>💰</span>${currency.name} (${currency.symbol})</p>`;
    // console.log(currencyInfo);

    // form.insertAdjacentHTML("afterend", html);
    // Here we have class countries as parent of our html here instead of form. We don't have form here!
    countriesContainer.insertAdjacentHTML("beforeend", html);

    // To meke it appear on the page, we have to change the opacity to 1:
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("portugal");
getCountryData("germany");
getCountryData("usa");
