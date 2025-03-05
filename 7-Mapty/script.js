"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

// ! Using Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      // console.log(pos)
      const { latitude } = pos.coords;
      const { longitude } = pos.coords;
      const coords = [latitude, longitude];

      //! using Leaflet's external library
      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //! handling clicks on map
      map.on("click", (mapE) => {
        
        //! assigning mapEvent to mapE
        mapEvent = mapE;

        //! renders a form whenever a click event on a map
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    () => {
      alert("Could not get your location! Try again!");
    }
  );
}

//! submits the form, whenever use clicks on 'enter' key on keyboard
form.addEventListener("submit", (e) => {
  //! prevent default behaviors
  e.preventDefault();

  //! clear input fields
  inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = "";

  //! unfocus the form
  inputDistance.blur();
  inputCadence.blur();
  inputDuration.blur();
  inputElevation.blur();

  //! Display a marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

//! toggles the form whenever user changes the exercise type
inputType.addEventListener("change", () => {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
