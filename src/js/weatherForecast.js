import Clock from "../assets/misc-icons/clock.png";
import {
  determineIconFileSrc,
  createIconSection,
  createElement,
  formatDayTime,
  formatTemp,
  determineDay,
  adjustTimeToMilitary,
} from "./helper-functions";

const ForecastOfCity = () => {
  const card = document.createElement("div");
  card.className = "hourly-forecast mt-4";

  const headerSection = createIconSection(Clock, "clock");
  headerSection.classList.remove("flex-column");

  const header = createElement("div", "Hourly Forecast");
  header.className = "ms-2";

  headerSection.append(header);

  //Hourly Forecast Section
  const hourlySection = document.createElement("div");
  hourlySection.className =
    "d-flex align-items-center my-2 overflow-auto hourly";

  createDay(hourlySection);

  //End of Forecast City section

  const update = (data) => {
    let hours = hourlySection.children;
    let hourIndex = determineHourIndex(data);
    let dayIndex = 0;
    for (let i = 0; i < hours.length; i++) {
      let hourObjs = getChildObjs(hours[i]);

      if (hourIndex == 24) {
        hourIndex = 0;
        dayIndex = 1;
      }

      populateForecastDisplay(hourObjs, data, dayIndex, hourIndex);
      hourIndex++;
    }
  };
  card.append(headerSection, hourlySection);

  return { card, update };
};

function populateForecastDisplay(objs, data, dayIndex, i) {
  let today = determineDay(data, dayIndex);

  objs.time.textContent = formatDayTime(today.hour[i].time, "haa");
  objs.tempF.textContent = `${formatTemp(`${today.hour[i].temp_f}`)}°F`;
  objs.tempC.textContent = `${formatTemp(`${today.hour[i].temp_c}`)}°C`;

  determineIconFileSrc(today.hour[i].condition.icon).then((img) => {
    objs.icon.src = img;
  });
}

function determineHourIndex(data) {
  let dayTime = adjustTimeToMilitary(data.location.localtime);
  let date = new Date(`${dayTime}`);
  let hourIndex = date.getHours() + 1;

  return hourIndex;
}

function getChildObjs(parent) {
  let hourDivs = parent.children;
  let time = hourDivs[0];
  let icon = hourDivs[1];
  let tempC = hourDivs[2];
  let tempF = hourDivs[3];

  return { time, icon, tempC, tempF };
}

function createHour() {
  const hour = document.createElement("div");
  hour.className = "d-flex flex-column align-items-center mb-2";

  const time = createElement("div", "Now");

  const icon = new Image();

  const tempC = createElement("span", "20°C");
  tempC.className = "metric"
  const tempF = createElement("span", "72°F");
  tempF.className = "imperial"

  hour.append(time, icon, tempC, tempF);
  return hour;
}

function createDay(hourlySection) {
  for (let i = 0; i < 24; i++) {
    let hour = createHour();
    hourlySection.append(hour);
  }
}

export default ForecastOfCity;
