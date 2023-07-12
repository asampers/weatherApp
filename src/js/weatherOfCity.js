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
} from "./helper-functions";

const WeatherOfCity = () => {
  const card = document.createElement("div");
  card.className = "city-weather";

  //Header of Card
  const cityName = document.createElement("div");
  cityName.textContent = "Milwaukee, Wisconsin";
  cityName.className = "h3";

  const dateTime = document.createElement("div");
  dateTime.textContent = "2023-06-29 15:05";
  dateTime.className = "small";

  //Main Section
  const mainSection = document.createElement("div");
  mainSection.className = "d-flex flex-column align-items-center";

  const tempSection = document.createElement("div");
  tempSection.className = "d-flex align-items-center";

  const temp = document.createElement("div");
  temp.className = "me-4 flex-grow-1 fs-2";
  temp.textContent = "84.2°F";

  const condition = document.createElement("div");
  condition.textContent = "Moderate rain";

  const icon = new Image();

  const highLowTemps = document.createElement("div");

  const highTemp = document.createElement("div");
  highTemp.className = "small";
  highTemp.textContent = "84.2°F";

  const lowTemp = document.createElement("div");
  lowTemp.className = "small";
  lowTemp.textContent = "61.7°F";

  highLowTemps.append(highTemp, lowTemp);
  tempSection.append(temp, highLowTemps);
  mainSection.append(icon, tempSection, condition);

  //Miscellaneous Weather Section
  const miscWeatherSection = document.createElement("div");
  miscWeatherSection.className = "d-flex justify-content-around mt-5";

  const humiditySection = createIconSection(Humidity, "humidity");
  const humidity = createElement("52%");
  humiditySection.appendChild(humidity);

  const windSection = createIconSection(Wind, "wind");
  const wind = createElement("9.4 mph ENE");
  windSection.appendChild(wind);

  const sunriseSection = createIconSection(Sunrise, "sunrise");
  const sunrise = createElement("05:15 AM");
  sunriseSection.appendChild(sunrise);

  const sunsetSection = createIconSection(Sunset, "sunset");
  const sunset = createElement("08:35 PM");
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
      temp,
      condition,
      icon,
      highTemp,
      lowTemp,
      humidity,
      wind,
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

  objs.cityName.textContent = `${data.location.name}, ${data.location.region}`;
  objs.dateTime.textContent = formatDayTime(data.location.localtime, "EEE PPp");
  objs.temp.textContent = `${data.current.temp_f}°F`;
  objs.condition.textContent = `${data.current.condition.text}`;
  objs.highTemp.textContent = `H: ${today.day.maxtemp_f}°F`;
  objs.lowTemp.textContent = `L: ${today.day.mintemp_f}°F`;
  objs.humidity.textContent = `${data.current.humidity}%`;
  objs.wind.textContent = `${data.current.wind_mph} mph ${data.current.wind_dir}`;
  objs.sunrise.textContent = `${today.astro.sunrise}`;
  objs.sunset.textContent = `${today.astro.sunset}`;

  determineIconFileSrc(data.current.condition.icon).then((img) => {
    objs.icon.src = img;
  });
}

export default WeatherOfCity;
