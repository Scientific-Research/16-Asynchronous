"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// There are multiple ways of doing AJAX calls in JS => we start with the most old school one which is XMLHttpRequest function:
const request = new XMLHttpRequest();
// Request is an object => Type of httpRequest to get the data is GET!
// https://github.com/public-apis/public-apis
request.open("GET", "https://restcountries.com/v3.1/name/germany");
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
          <img class="country__img" src=${data.coatOfArms.png} />
          <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>POP people</p>
            <p class="country__row"><span>🗣️</span>${data.languages.deu}</p>
            <p class="country__row"><span>💰</span>${data.currencies.Eur}</p>
          </div>
        </article>`;

  // form.insertAdjacentHTML("afterend", html);
});
