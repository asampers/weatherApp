import Humidity from "../assets/misc-icons/humidity.png";
import Sunrise from "../assets/misc-icons/sunrise.png";
import Sunset from "../assets/misc-icons/sunset.png";
import Wind from "../assets/misc-icons/wind.png";
import {
  determineIconFileSrc,
  createElement,
  createIconSection,
  formatDayTime,
  determineDay,
  adjustTimeToMilitary,
} from "./helper-functions";

const WeatherOfCity = () => {
  const card = document.createElement("div");
  card.className = "city-weather";

  //Header of Card
  const cityName = createElement("div", "Milwaukee, Wisconsin");
  cityName.className = "h3";

  const dateTime = createElement("div", "2023-06-29 15:05");
  dateTime.className = "small";

  //Main Section
  const mainSection = document.createElement("div");
  mainSection.className = "d-flex flex-column align-items-center";

  const tempSection = document.createElement("div");
  tempSection.className = "d-flex align-items-center";

  const tempC = createElement("span", "29.2°C");
  tempC.className = "me-4 flex-grow-1 fs-2 metric";

  const tempF = createElement("span", "89.2°F");
  tempF.className = "me-4 flex-grow-1 fs-2 imperial";

  const condition = createElement("div", "Moderate rain");

  const icon = new Image();

  const highLowTemps = document.createElement("div");
  highLowTemps.className = "d-flex flex-column";

  const highTempC = createElement("span", "34.2°C");
  highTempC.className = "small metric";

  const highTempF = document.createElement("span", "84.2°F");
  highTempF.className = "small imperial";

  const lowTempC = createElement("span", "21.7°C");
  lowTempC.className = "small metric";

  const lowTempF = document.createElement("span", "61.7°F");
  lowTempF.className = "small imperial";

  highLowTemps.append(highTempC, highTempF, lowTempC, lowTempF);
  tempSection.append(tempC, tempF, highLowTemps);
  mainSection.append(icon, tempSection, condition);

  //Miscellaneous Weather Section
  const miscWeatherSection = document.createElement("div");
  miscWeatherSection.className = "d-flex justify-content-around mt-5";

  const humiditySection = createIconSection(Humidity, "humidity");
  const humidity = createElement("div", "52%");
  humiditySection.appendChild(humidity);

  const windSection = createIconSection(Wind, "wind");
  const windC = document.createElement("span");
  windC.className = "metric";

  const windF = document.createElement("span");
  windF.className = "imperial";

  windSection.append(windC, windF);

  const sunriseSection = createIconSection(Sunrise, "sunrise");
  const sunrise = createElement("div", "05:15 AM");
  sunriseSection.appendChild(sunrise);

  const sunsetSection = createIconSection(Sunset, "sunset");
  const sunset = createElement("div", "08:35 PM");
  sunsetSection.appendChild(sunset);

  miscWeatherSection.append(
    sunriseSection,
    windSection,
    humiditySection,
    sunsetSection
  );
  //End of Miscellaneous weather section

  const update = (data) => {
    const cardObjs = {
      cityName,
      dateTime,
      tempC,
      tempF,
      condition,
      icon,
      highTempC,
      highTempF,
      lowTempC,
      lowTempF,
      humidity,
      windC,
      windF,
      sunrise,
      sunset,
    };

    populateWeatherDisplay(cardObjs, data);
  };

  card.append(cityName, dateTime, mainSection, miscWeatherSection);

  return { card, update };
};

function populateWeatherDisplay(objs, data) {
  let today = determineDay(data, 0);
  let dayTime = adjustTimeToMilitary(data.location.localtime);

  objs.cityName.textContent = `${data.location.name}, ${data.location.region}`;
  objs.dateTime.textContent = formatDayTime(dayTime, "EEE PPp");
  objs.condition.textContent = `${data.current.condition.text}`;
  objs.humidity.textContent = `${data.current.humidity}%`;
  objs.sunrise.textContent = `${today.astro.sunrise}`;
  objs.sunset.textContent = `${today.astro.sunset}`;
  populateMetricDisplay(objs, data, today);
  populateImperialDisplay(objs, data, today);

  determineIconFileSrc(data.current.condition.icon).then((img) => {
    objs.icon.src = img;
  });
}

function populateMetricDisplay(objs, data, today) {
  objs.tempC.textContent = `${data.current.temp_c}°C`;
  objs.highTempC.textContent = `H: ${today.day.maxtemp_c}°C`;
  objs.lowTempC.textContent = `L: ${today.day.mintemp_c}°C`;
  objs.windC.textContent = `${data.current.wind_kph} kph ${data.current.wind_dir}`;
}

function populateImperialDisplay(objs, data, today) {
  objs.tempF.textContent = `${data.current.temp_f}°F`;
  objs.highTempF.textContent = `H: ${today.day.maxtemp_f}°F`;
  objs.lowTempF.textContent = `L: ${today.day.mintemp_f}°F`;
  objs.windF.textContent = `${data.current.wind_mph} mph ${data.current.wind_dir}`;
}

export default WeatherOfCity;
