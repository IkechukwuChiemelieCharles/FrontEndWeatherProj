"use strict";

const input = document.querySelector("#input");
const searchBtn = document.querySelector("#searchBtn");
const country = document.querySelector(".country");
const date = document.querySelector(".date");
const degree = document.querySelector(".degree");
const deg = document.querySelector(".deg");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const prec = document.querySelector(".prec");

searchBtn.addEventListener("click", function () {
  console.log(input.value);

  weatherApi();
});

// Got  Dates and year
const now = new Date();
const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
const monthName = now.toLocaleDateString("en-US", { month: "long" });
const Currdate = now.getDate();
const year = now.getFullYear();
date.textContent = `${dayName}, ${monthName}, ${Currdate}, ${year}`;

async function weatherApi() {
  try {
    //Fetched Api that converts Country to Lat and long
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?country=${input.value}&format=json`,
    );

    if (!res.ok) throw new Error(`Now Data Found ${"d"}`);

    const data = await res.json();

    country.textContent = data[0].display_name;

    console.log(data);

    console.log(data[0].lat);
    console.log(data[0].lon);

    // fetched Api that uses lag and long goten from first api to fetch country weather  data

    const WeatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`,
    );

    const WeatherData = await WeatherRes.json();

    console.log(WeatherData.current.temperature_2m);

    degree.textContent = `${WeatherData.current.temperature_2m}°`;
    deg.textContent = `${WeatherData.current.temperature_2m} ${
      WeatherData.current_units.temperature_2m
    }`;

    humidity.textContent = `${WeatherData.current.relative_humidity_2m} ${
      WeatherData.current_units.relative_humidity_2m
    }`;

    wind.textContent = `${WeatherData.current.wind_speed_10m} ${
      WeatherData.current_units.wind_speed_10m
    }`;

    prec.textContent = `${WeatherData.current.precipitation} ${
      WeatherData.current_units.precipitation
    }`;

    console.log(WeatherData);
  } catch (err) {
    console.log(err);
  }
}

//  `https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&hourly=temperature_2m`,

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m

// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json

// fetch country long and lag first
// then using the lag find country weatherApi
