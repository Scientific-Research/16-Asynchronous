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
const getPosition = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position), // we need the position when we have a resolved promise, that's why we assign the position to the resolove() method!
      (err) => reject(err)
    )
  );
};

getPosition().then((pos) => console.log(pos)); // when we have a resolved Promise, it means we got the Position successfully and we return it to the name of the function => getPosition(). We call the function, it has the position and returns it to the then method() and display it to the console()!
