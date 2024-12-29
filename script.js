"use strict";

console.log("-----------------------Promisifying the GEOLOCATIONS API-------");

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// In console.log() we see first of all the "Getting Position" and then the coordination because of the ASYNCHRONOUS BEHAVIOUR(NON-BLOCKING BEHAVIOUR)
// Get Current Location is playing off at the background to get the location(IN WEB APIs area in Brwoser), In the meantime, JS goes to the next statement and run that!
navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (err) => console.log(err)
);

console.log("Getting Position");

// This is very clearly a callback-based API and we have to pass in two different callbacks which are position and err.

// This is a very good opportunity to promisify a callback-based API to a Promised-based API:
const getPosition = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position), // we need the position when we have a resolved promise, that's why we assign the position to the resolove() method!
      (err) => reject(err)
    )
  );
};

// getPosition().then((pos) => console.log(pos)); // when we have a resolved Promise, it means we got the Position successfully and we return it to the name of the function => getPosition(). We call the function, it has the position and returns it to the then method() and display it to the console()!

const whereAmI = function () {
  getPosition().then((pos) => {
    // console.log(pos);
    const { latitude: lat, longitude: lng } = pos.coords;
    // LET'S US TO BRING IT TO THE NEXT LEVEL: In last Coding-Challenge, we give the lat and lng parameters manually as input parameters to the function. BUT here we have them and we got them acutally as our current location(position), therefore, I give my current location(lat and lng) as inputs to the fetch function after a destructuring! => JUST THIS CHANGE AND ALL THE REMANING CODE REMAINS INTACT!
    const response = fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Problem with geocoding! ${response.status}`);
        }
        return response.json(); // this returns a resolved promise as data in next then method!
      })
      .then((data) => {
        console.log(data);
        // if (data.country === undefined) {
        if (!data.country) {
          throw new Error(`You can only make 3 requests per second!`);
        }
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Country not found! ${res.status}`);
        }
        return res.json(); // this returns a resolved promise as data in next then method!
      })
      .then((data) => {
        renderCountry(data[0]);
      })
      .catch((err) =>
        console.error(
          `ERROR: Something went Wrong ☠️☠️☠️ ${err.message} Try again later!`
        )
      )
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  });
};

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
  // countriesContainer.style.opacity = 1;
};

// btn.addEventListener("click", () => {
//   whereAmI();
// });

// OR, because our function => whereAmI(); get no input parameter, we can write the above function simpler as following:
btn.addEventListener("click", whereAmI);
