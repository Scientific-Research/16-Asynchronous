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
  // Geolocation:
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // Reverse geocoding:
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // Here we can have one or more AWAIT statements!
  // after writing await word, we need a promise, which can come from a fetch function => fetch function return a promise and we can await of that result here!
  // AWAIT, wait for the result of the fetch function => it stops the code execution at this point until the promise is fullfilled(untill the data has been fetched in this case!)

  // Country data:
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  const data = await res.json(); // this returns a new promise and previously we have to continue with .then chain! BUT NOW; we have to AWAIT this and assign it to a new variable! JUST THAT!!!
  console.log(data);
  renderCountry(data[0]);

  // QUESTION: IS AWAIT BLOCK OUR CODE IN THIS POINT: OF COURSE NOT! Stopping the execution of an async function in this point is not a problem because the async function is running asynchrounsly in the background, therefore it is not blocking the main thread of execution! and that is special about the async await function which is look like a regualr sync function but in fact in background is running asynchronously!

  // As soon as fetch function is resolved(the results of fetching are there), then the result of whole process including await is resolved too and we can store that in a variable like res which is response!
  // console.log(res);

  // NOTE: Async && Await are in fact simply syntatic sugar over the .then method in Promises!
  // ABOVE ASYNC AND AWAIT ARE EQUIVALENT OF BELOW FETCH AND .THEN:
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then((res) =>
  //   console.log(res)
  // );
};
// whereAmI("portugal");
whereAmI();
console.log("FIRST"); // this will be displayed first because whereAmI is an async function and is running in the background without blocking our main thread and code will move on to the next line which is this line here and publish 'FIRST' at console!

// NOTE: Before that we have to mess up with .then methods and callback hells, but now, all of the are gone and we have a elegant way of writing the async function using async and await keywords and our code looks like a regular sync function and we assign the result of the resolved Promise to a new variable exactly like a regular sync function!

// btn.addEventListener("click", whereAmI);
