"use strict";

console.log("-----------------------Promisifying the GEOLOCATIONS API-------");

navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (err) => console.log(err)
);
