"use strict";

console.log("-----------------------Promisifying the GEOLOCATIONS API-------");

// In console.log() we see first of all the "Getting Position" and then the coordination because of the ASYNCHRONOUS BEHAVIOUR(NON-BLOCKING BEHAVIOUR)
// Get Current Location is playing off at the background to get the location(IN WEB APIs area in Brwoser), In the meantime, JS goes to the next statement and run that!
navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (err) => console.log(err)
);

console.log("Getting Position");
