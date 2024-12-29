"use strict";

console.log("-----------------------Promisifying the GEOLOCATIONS API-------");

// In console.log() we see first of all the "Getting Position" and then the coordination because of the ASYNCHRONOUS BEHAVIOUR(NON-BLOCKING BEHAVIOUR)
// Get Current Location is playing off at the background to get the location(IN WEB APIs area in Brwoser), In the meantime, JS goes to the next statement and run that!
navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (err) => console.log(err)
);

console.log("Getting Position");

// This is very clearly a callback-based API and we have to pass in two different callbacks which are position and err.

// This is a very good opportunity to promisify a callback-based API to a Promised-based API:
const wait = (seconds) => {
  // We don't need the reject here, because a Timer will never fail, Therefore, we don't need to write it here! Promise is like array method(map) => In map, there are three parameters, but most of the time, we need one or maximum 2 of them!

  // Callback function here would be simply resolve and we don't need to pass in any value in resolve function like above, This is not mandatory for a resolve function => NO resolved values are needed! We just need to wait our resolve() function with a certain amount of time here!
  // resolve function will be executed for example after 2 seconds!
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

wait(2)
  .then(() => {
    console.log("I waited for 2 seconds!");
    return wait(1);
  })
  .then(() => console.log("I waited for 1 second!"));

const geolocation = () => {
  return new Promise((position, err) =>
    navigator.geolocation.getCurrentPosition(position, err)
  );
};

geolocation().then(() => {
  console.log();
});
