import Clock from "../assets/misc-icons/clock.png";
import { format } from "date-fns";
import { createIconSection, createElement } from "./weatherOfCity";

const ForecastOfCity = () => {
  const card = document.createElement("div");
  card.className = "hourly-forecast mt-4";

  const headerSection = createIconSection(Clock, "clock");
  headerSection.classList.remove("flex-column");

  const header = createElement("Hourly Forecast");
  header.className = "ms-2";

  headerSection.append(header);

  //Hourly Forecast Section
  const hourlySection = document.createElement("div");
  hourlySection.className =
    "d-flex align-items-center my-2 overflow-auto hourly";

  createDay(hourlySection);

  //End of Miscellaneous weather section

  const update = (data) => {
    let hours = hourlySection.children;
    let date = new Date(`${data.location.localtime}`);
    let currentHour = date.getHours() + 1;
    let currentDay = 0;
    for (let i = 0; i < hours.length; i++) {
      let hourDivs = hours[i].children;
      let time = hourDivs[0];
      let icon = hourDivs[1];
      let temp = hourDivs[2];
      let hourObjs = {
        time,
        icon,
        temp,
      };
      populateForecastDisplay(hourObjs, data, currentDay, currentHour);
      currentHour++;
      if (currentHour == 24) {
        currentHour = 0;
        currentDay = 1;
      }
    }
  };
  card.append(headerSection, hourlySection);

  return { card, update };
};

function populateForecastDisplay(objs, data, day, i) {
  objs.time.textContent = formatTime(
    data.forecast.forecastday[day].hour[i].time
  );
  objs.temp.textContent = formatTemp(
    `${data.forecast.forecastday[day].hour[i].temp_f}`
  );
  determineIconFileSrc(
    data.forecast.forecastday[day].hour[i].condition.icon
  ).then((img) => {
    objs.icon.src = img;
  });
}

function determineIconFileName(data) {
  let iconString = data;
  let stringToRemove = "//cdn.weatherapi.com/weather/64x64";
  let endToRemove = ".png";
  let remainder = iconString.replace(stringToRemove, "");
  let answer = remainder.replace(endToRemove, "");
  return answer;
}

async function determineIconFileSrc(data) {
  let fileName = determineIconFileName(data);
  let module = await import(`../assets${fileName}.png`);
  let img = await module.default;
  return img;
}

function createHour() {
  const hour = document.createElement("div");
  hour.className = "d-flex flex-column align-items-center mb-2";

  const time = createElement("Now");

  const icon = new Image();
  icon.src = new URL("../assets/day/302.png", import.meta.url);

  const temp = createElement("72°F");

  hour.append(time, icon, temp);
  return hour;
}

function createDay(hourlySection) {
  for (let i = 0; i < 24; i++) {
    let hour = createHour();
    hourlySection.append(hour);
  }
}

function formatTime(string) {
  let date = new Date(string);
  let time = format(date, "haa");
  return time;
}

function formatTemp(string) {
  let temp = string.replace(/\.\d/, "");
  return `${temp}°F`;
}

export default ForecastOfCity;
