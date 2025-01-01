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
    // console.log(response);
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

console.log("---OTHER PROMISE COMBINATORS:RACE,ALLSETTLED and ANY---------");

// Promise.race => receive an array of promise and return only a promise:

// Using IIFE:
(async () => {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  // THESE THREE PROMISES RACE AGAINST EACH OTHER LIKE IN A REAL RACE! IF THE WINNING PROMISE IS A FULLFILLED PROMISE, THEN WE SEE THE INFO FOR THIS FULLFILEDD PROMISE ON THE CONSOLE.LOG() => IT DEPENDS, WHICH PROMISE IS FASTER THAN ANOTHER ONE, THIS PROMISE WILL WIN AND WE SEE THE RESULT OF THIS PROMISE IN CONSOLE.LOG()! => In network Tab, we can see which Promise takes shorter time to be fetched => and this Promise is WINNER at the end and we have the info about this Promise in console.log()!

  // THE Promise which is rejected can win the race too! It means Promise.race() is short-circuited whenever one of the Promises get settled(No matter is fullfilled or rejected!)
  console.log(res[0]);
})();

// ANOTHER EXAMPLE WITH Promise.race()
const timeout = (sec) => {
  // We don't need resolve section here, that's why we use underline(_) here!
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

// AND NOW WE BRING THE timeout() AND A PROMISE TOGETHER in Promise.race() to make a race between them and if the timeout() functions wins because 1 msec is very short  => the Promise.race() will be rejected:

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(0.15), // 0.15sec is not enough for fetch function, that's why the winner would be timeout(0.15) function which will is fullfilled faster than fetch function!
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

console.log("--------------Promise.allSettled--------------------------------");

// It takes an array of promises and returns an array of all settled promises! Not matter if Promise is rejected or not!

// The difference between Promise.allSettled and Promise.all is that we have short-circuit in Promise.all => when a Promise is fullfilled or rejected, It returns that and doesn't continue anymore.
// BUT in Promise.allSettled, we don't have short-circuit and it returns an array containing of ALL rejected and resolevd Promises!

// A VERY SIMPLE AND FAST EXAMPLE WHICH IS ALREADY CLEAR WHICH ONE IS RESOLVE AN WHICH ONE IS REJECT => we don't use one with fetch function or something similar that we have to wait for that to be resolved(fullfilled)!
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res)); // (3) [{…}, {…}, {…}] It gives us an array of all the Promises, even with one rejected Promise(Promise.reject("ERROR")!

// IN CONTRAST TO Promise.all =>
Promise.all([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res)) // 1: Uncaught (in promise) ERROR => we get an error because of this Promise => Promise.reject("ERROR")
  .catch((err) => console.error(err)); // ERROR => because Promise.all will short-circuit if there is one rejected Promise which we have one here =>  Promise.reject("ERROR")
