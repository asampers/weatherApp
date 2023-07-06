import Clock from "../assets/misc-icons/clock.png";
import { format } from "date-fns";

const ForecastOfCity = () => {
  const card = document.createElement("div");
  card.className = "mt-2";

  const headerSection = document.createElement("div");
  headerSection.className = "d-flex align-items-center";

  const headerIcon = new Image();
  headerIcon.alt = "clock";
  headerIcon.src = Clock;

  const header = document.createElement("span");
  header.className = "ms-2";
  header.textContent = "Hourly Forecast";

  headerSection.append(headerIcon, header);

  //Hourly Forecast Section
  const hourlySection = document.createElement("div");
  hourlySection.className =
    "d-flex align-items-center my-2 overflow-auto hourly";

  createDay(hourlySection);

  //End of Miscellaneous weather section

  const update = (data) => {
    let hours = hourlySection.children;
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
      populateForecastDisplay(hourObjs, data, i);
    }
  };
  card.append(headerSection, hourlySection);

  return { card, update };
};

function populateForecastDisplay(objs, data, i) {
  objs.time.textContent = formatTime(data.forecast.forecastday[0].hour[i].time);
  objs.temp.textContent = `${data.forecast.forecastday[0].hour[i].temp_f}°F`;
  determineIconFileSrc(
    data.forecast.forecastday[0].hour[i].condition.icon
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

function createElement(text) {
  const element = document.createElement("div");
  element.textContent = text;

  return element;
}

function createSection() {
  const section = document.createElement("div");
  section.className = "d-flex flex-column align-items-center mb-2";

  const time = createElement("Now");

  const icon = new Image();
  icon.src = new URL("../assets/day/302.png", import.meta.url);

  const temp = createElement("72°F");

  section.append(time, icon, temp);
  return section;
}

function createDay(hourlySection) {
  for (let i = 0; i < 24; i++) {
    let hour = createSection();
    hourlySection.append(hour);
  }
}

function formatTime(string) {
  let date = new Date(string);
  let time = format(date, "haa");
  return time;
}

export default ForecastOfCity;
