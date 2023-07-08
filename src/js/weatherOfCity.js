import Humidity from "../assets/misc-icons/humidity.png";
import Sunrise from "../assets/misc-icons/sunrise.png";
import Sunset from "../assets/misc-icons/sunset.png";
import Wind from "../assets/misc-icons/wind.png";
import { format } from "date-fns";

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
  icon.src = new URL("../assets/day/302.png", import.meta.url);

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
  objs.cityName.textContent = `${data.location.name}, ${data.location.region}`;
  objs.dateTime.textContent = formatDayTime(data.location.localtime);
  objs.temp.textContent = `${data.current.temp_f}°F`;
  objs.condition.textContent = `${data.current.condition.text}`;

  determineIconFileSrc(data.current.condition.icon).then((img) => {
    objs.icon.src = img;
  });
  objs.highTemp.textContent = `H: ${data.forecast.forecastday[0].day.maxtemp_f}°F`;
  objs.lowTemp.textContent = `L: ${data.forecast.forecastday[0].day.mintemp_f}°F`;
  objs.humidity.textContent = `${data.current.humidity}%`;
  objs.wind.textContent = `${data.current.wind_mph} mph ${data.current.wind_dir}`;
  objs.sunrise.textContent = `${data.forecast.forecastday[0].astro.sunrise}`;
  objs.sunset.textContent = `${data.forecast.forecastday[0].astro.sunset}`;
}

function determineIconFileName(string) {
  let stringToRemove = "//cdn.weatherapi.com/weather/64x64";
  let endToRemove = ".png";
  let remainder = string.replace(stringToRemove, "");
  let fileName = remainder.replace(endToRemove, "");
  return fileName;
}

async function determineIconFileSrc(icon) {
  let fileName = determineIconFileName(icon);
  let module = await import(`../assets${fileName}.png`);
  let img = await module.default;
  return img;
}

function createIconSection(iconSrc, altText) {
  const section = document.createElement("div");
  section.className = "d-flex flex-column align-items-center";
  const sectionIcon = new Image();
  sectionIcon.alt = altText;
  sectionIcon.src = iconSrc;

  section.appendChild(sectionIcon);
  return section;
}

function createElement(text) {
  const element = document.createElement("div");
  element.textContent = text;

  return element;
}

function formatDayTime(string) {
  let date = new Date(string);
  let formatted = format(date, "EEE PPp");
  return formatted;
}
export {WeatherOfCity, createIconSection, createElement};
