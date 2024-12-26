"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// There are multiple ways of doing AJAX calls in JS => we start with the most old school one which is XMLHttpRequest function:
const request = new XMLHttpRequest();
// Request is an object => Type of httpRequest to get the data is GET!
// https://github.com/public-apis/public-apis
request.open("GET", "https://restcountries.com/v3.1/name/deutschland");
request.send(); // => This send our GET request to the above URL!

// console.log(request.responseText); We will have here nothing

// The responseText will be accessible after the request has loaded
request.addEventListener("load", function () {
  // console.log(request.responseText); // OR using this keyword points to the request
  console.log(this.responseText); // this keyword refers to request object directly!

  // this.responseText is in JSON format which is a big string of text and what we need is JS actual object! Therfore, we have to use JSON.parse() to convert the JSON string text to JS obejcts!

  const data = JSON.parse(this.responseText);
  console.log(data); // Now, we have an object full of info about Germany
});
