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
const weatherImg = document.querySelector(".weatherImg");
const dailyDropDown = document.querySelector(".dailyDropDown");
const day = document.querySelectorAll(".day");
const forCastBoxes = document.querySelectorAll(".forecastBox");
const rects = document.querySelectorAll(".rect");
const darkMode = document.querySelector(".dark-mode");
const darkicons = document.querySelectorAll(".dark");
const error = document.querySelector(".error");
const menu = document.querySelector("menu");
const section = document.querySelector("section");
const errorBTN = document.querySelector(".errorBTN");
const loading = document.querySelector(".loading");
const unitDropDown = document.querySelector(".unitDropDown");
const units = document.querySelector(".units");
const imperialSwitch = document.querySelector(".imperialSwitch");
const metricSwitch = document.querySelector(".metricSwitch");
const metricUnit = document.querySelectorAll(".metricUnit");
const imperialUnit = document.querySelectorAll(".imperialUnit");
const impCheck = document.querySelectorAll(".impCheck");
const metCheck = document.querySelectorAll(".metCheck");

imperialSwitch.addEventListener("click", function () {
  imperialSwitch.classList.add("hidden");
  metricSwitch.classList.remove("hidden");

  imperialSwitch.classList.add("userSelected");
  metricSwitch.classList.remove("userSelected");

  imperialUnit.forEach(function (IU) {
    IU.classList.add("active");
  });
  metricUnit.forEach(function (IU) {
    IU.classList.remove("active");
  });
  impCheck.forEach(function (IC) {
    IC.classList.remove("hidden");
  });
  metCheck.forEach(function (MC) {
    MC.classList.add("hidden");
  });

  // if (this.classList.contains("imperial")) {
  //   console.log(this);
  // }
});

metricSwitch.addEventListener("click", function () {
  imperialSwitch.classList.remove("userSelected");
  metricSwitch.classList.add("userSelected");

  imperialSwitch.classList.remove("hidden");
  metricSwitch.classList.add("hidden");

  metricUnit.forEach(function (MU) {
    MU.classList.add("active");
  });
  imperialUnit.forEach(function (IU) {
    IU.classList.remove("active");
  });

  impCheck.forEach(function (IC) {
    IC.classList.add("hidden");
  });
  metCheck.forEach(function (MC) {
    MC.classList.remove("hidden");
  });

  // if ((this.classList.contains = "metric")) {
  //   console.log(this);
  // }

  console.log("click");
});

searchBtn.addEventListener("click", function () {
  console.log(input.value);

  weatherApi();
});

errorBTN.addEventListener("click", function () {
  menu.classList.remove("hidden");
  section.classList.remove("hidden");
  error.classList.add("hidden");
  console.log("click");
});
units.addEventListener("click", function () {
  unitDropDown.classList.toggle("hidden");
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
      `https://nominatim.openstreetmap.org/search?q=${input.value}&format=json&limit=1`,
    );

    if (!res.ok) {
      // menu.classList.add("hidden");
      // error.classList.remove("hidden");

      throw new Error(`Now Data Found ${"d"}`);
    }

    // menu.classList.add("hidden");
    section.classList.add("hidden");
    // error.classList.add("hidden");
    loading.classList.remove("hidden");

    const data = await res.json();

    country.textContent = data[0].name;

    // if (imperialSwitch.classList.contains("userSelected")) {
    //   console.log("mf hs it");
    // }
    // {
    //   console.log("mf doesnt");
    // }
    const contained = imperialSwitch.classList.contains("userSelected")
      ? true
      : false;

    console.log(contained);
    const unit = contained;

    // const tempUnit = unit === "metric" ? "celsius" : "fahrenheit";
    // const windUnit = unit === "metric" ? "kmh" : "mph";
    // const precipUnit = unit === "metric" ? "mm" : "inch";

    const tempUnit = unit ? "celsius" : "fahrenheit";
    const windUnit = unit ? "kmh" : "mph";
    const precipUnit = unit ? "mm" : "inch";

    // const tempUnit = "celsius";
    // const windUnit = "kmh";
    // const precipUnit = "mm";

    // fetched Api that uses lag and long goten from first api to fetch country weather  data
    // const WeatherRes = await fetch(
    //   `https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m,weather_code,precipitation,wind_speed_10m&timezone=auto`,
    // );

    const WeatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m,weather_code,precipitation,wind_speed_10m&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}&precipitation_unit=${precipUnit}&timezone=auto`,
    );

    const WeatherData = await WeatherRes.json();

    console.log(WeatherData.current.temperature_2m);

    degree.textContent = `${WeatherData.current.temperature_2m}°`;
    deg.textContent = `${WeatherData.current.temperature_2m} ${
      WeatherData.current_units.temperature_2m
    }`;

    //used IF Else to set the weather image
    const code = WeatherData.current.weather_code;
    if (code === 0) {
      weatherImg.src = "assets/images/icon-sunny.webp";
    } else if (code === 1 || code === 2) {
      weatherImg.src = "assets/images/icon-partly-cloudy.webp";
    } else if (code === 3) {
      weatherImg.src = "assets/images/icon-overcast.webp";
    } else if (code === 45 || code === 48) {
      weatherImg.src = "assets/images/icon-fog.webp";
    } else if (code === 51 || code === 53 || code === 55) {
      weatherImg.src = "assets/images/icon-drizzle.webp";
    } else if (code === 61 || code === 63 || code === 65) {
      weatherImg.src = "assets/images/icon-rain.webp";
    } else if (code === 71 || code === 73 || code === 75) {
      weatherImg.src = "assets/images/icon-snow.webp";
    } else if (code === 95) {
      weatherImg.src = "assets/images/icon-storm.webp";
    }

    // console.log(typeof WeatherData.current.weather_code);
    // console.log(WeatherData.current.weather_code);

    humidity.textContent = `${WeatherData.current.relative_humidity_2m} ${
      WeatherData.current_units.relative_humidity_2m
    }`;

    wind.textContent = `${WeatherData.current.wind_speed_10m} ${
      WeatherData.current_units.wind_speed_10m
    }`;

    prec.textContent = `${WeatherData.current.precipitation} ${
      WeatherData.current_units.precipitation
    }`;

    // console.log();

    const dailyWeather = WeatherData.daily;

    // console.log(dailyWeather);
    // const forCastBoxesChild = forCastBoxes.chil;

    // console.log(forCastBoxesChild);

    forCastBoxes.forEach(function (box, i) {
      // console.log(box);
      const date = dailyWeather.time[i];
      const max = dailyWeather.temperature_2m_max[i];
      const min = dailyWeather.temperature_2m_min[i];
      const code = dailyWeather.weather_code[i];

      const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      // max[0].textContent = `${max}`;
      // degSpans[1].textContent = `${min}`;

      box.querySelector("p").textContent = dayName;
      box.querySelector(".min").textContent = min;
      box.querySelector(".max").textContent = max;

      const dailyWeatherImg = box.querySelector("img");

      if (code === 0) {
        dailyWeatherImg.src = "assets/images/icon-sunny.webp";
      } else if (code === 1 || code === 2) {
        dailyWeatherImg.src = "assets/images/icon-partly-cloudy.webp";
      } else if (code === 3) {
        dailyWeatherImg.src = "assets/images/icon-overcast.webp";
      } else if (code === 45 || code === 48) {
        dailyWeatherImg.src = "assets/images/icon-fog.webp";
      } else if (code === 51 || code === 53 || code === 55) {
        dailyWeatherImg.src = "assets/images/icon-drizzle.webp";
      } else if (code === 61 || code === 63 || code === 65) {
        dailyWeatherImg.src = "assets/images/icon-rain.webp";
      } else if (code === 71 || code === 73 || code === 75) {
        dailyWeatherImg.src = "assets/images/icon-snow.webp";
      } else if (code === 95) {
        dailyWeatherImg.src = "assets/images/icon-storm.webp";
      }
    });

    dailyDropDown.innerHTML = "";

    WeatherData.daily.time.forEach(function (date) {
      const option = document.createElement("option");
      option.value = date;
      option.textContent = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      dailyDropDown.appendChild(option);

      // console.log(option);
    });

    dailyDropDown.addEventListener("change", function () {
      //   console.log(this.value);

      const selectedDate = dailyDropDown.value;
      showHourly(selectedDate);
    });

    function showHourly(selectedDate) {
      const hourly = WeatherData.hourly;

      let hourIndex = 0;

      const filteredHours = [];

      hourly.time.forEach((time, i) => {
        if (time.startsWith(selectedDate)) {
          const temp = hourly.temperature_2m[i];
          const code = hourly.weather_code[i];

          filteredHours.push({
            temp: temp,
            code: code,
            time: time,
          });

          // console.log(time, temp, code);

          if (rects[hourIndex]) {
            rects[hourIndex].querySelector("span").textContent = `${temp}°`;

            const date = new Date(time);

            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            });

            rects[hourIndex].querySelector("p").textContent =
              `${formattedTime}`;

            const rectIMG = rects[hourIndex].querySelector("img");

            if (code === 0) {
              rectIMG.src = "assets/images/icon-sunny.webp";
            } else if (code === 1 || code === 2) {
              rectIMG.src = "assets/images/icon-partly-cloudy.webp";
            } else if (code === 3) {
              rectIMG.src = "assets/images/icon-overcast.webp";
            } else if (code === 45 || code === 48) {
              rectIMG.src = "assets/images/icon-fog.webp";
            } else if (code === 51 || code === 53 || code === 55) {
              rectIMG.src = "assets/images/icon-drizzle.webp";
            } else if (code === 61 || code === 63 || code === 65) {
              rectIMG.src = "assets/images/icon-rain.webp";
            } else if (code === 71 || code === 73 || code === 75) {
              rectIMG.src = "assets/images/icon-snow.webp";
            } else if (code === 95) {
              rectIMG.src = "assets/images/icon-storm.webp";
            }
          }
          //   .src =
          //     "assets/images/icon-drizzle.webp";
          // }

          hourIndex++;
        }
      });
    }
    darkicons.forEach(function (icon) {
      icon.classList.remove("dark-mode");
    });
    // darkMode.classList.add = "hidden";

    menu.classList.remove("hidden");
    section.classList.remove("hidden");
    // error.classList.add("hidden");
    loading.classList.add("hidden");

    console.log(WeatherData);
  } catch (err) {
    console.log(err);
    menu.classList.add("hidden");
    section.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

//  `https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&hourly=temperature_2m`,

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m

// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json

// fetch country long and lag first
// then using the lag find country weatherApi
