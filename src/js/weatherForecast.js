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

  const header = createElement("Hourly Forecast");
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

      populateForecastDisplay(hourObjs, data, dayIndex, hourIndex);
      hourIndex++;
      if (hourIndex == 24) {
        hourIndex = 0;
        dayIndex = 1;
      }
    }
  };
  card.append(headerSection, hourlySection);

  return { card, update };
};

function populateForecastDisplay(objs, data, dayIndex, i) {
  let today = determineDay(data, dayIndex);

  objs.time.textContent = formatDayTime(today.hour[i].time, "haa");
  objs.temp.textContent = `${formatTemp(`${today.hour[i].temp_f}`)}°F`;

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
  let temp = hourDivs[2];

  return { time, icon, temp };
}

function createHour() {
  const hour = document.createElement("div");
  hour.className = "d-flex flex-column align-items-center mb-2";

  const time = createElement("Now");

  const icon = new Image();

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

export default ForecastOfCity;
