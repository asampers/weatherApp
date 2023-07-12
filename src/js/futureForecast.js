import Calendar from "../assets/misc-icons/calendar.png";

import {
  determineIconFileSrc,
  createIconSection,
  createElement,
  formatDayTime,
  formatTemp,
  determineDay,
} from "./helper-functions";

const FutureForecast = () => {
  const card = document.createElement("div");
  card.className = "future-forecast mt-4";

  const headerSection = createIconSection(Calendar, "calendar");
  headerSection.classList.remove("flex-column");

  const header = createElement("Future Forecast");
  header.className = "ms-2";

  headerSection.append(header);

  //Daily Forecast Section
  const dailySection = document.createElement("div");
  dailySection.className = "row my-2 mx-1 daily";

  const dayOne = createForecastDay();

  const dayTwo = createForecastDay();

  dailySection.append(dayOne, dayTwo);

  //End of Daily Forecast Section

  const update = (data) => {
    let days = dailySection.children;
    let dayIndex = 1;
    for (let i = 0; i < days.length; i++) {
      let dayObjs = getChildObjs(days[i]);

      populateFutureDisplay(dayObjs, data, dayIndex);
      dayIndex++;
    }
  };
  card.append(headerSection, dailySection);

  return { card, update };
};

function populateFutureDisplay(objs, data, dayIndex) {
  let today = determineDay(data, dayIndex);
  let tempOne = formatTemp(`${today.day.mintemp_f}`);
  let tempTwo = formatTemp(`${today.day.maxtemp_f}`);
  let colorOne = setColor(tempColors, tempOne);
  let colorTwo = setColor(tempColors, tempTwo);

  objs.day.textContent = formatDayTime(`${today.date} 00:00`, "EEE");
  objs.lowTemp.textContent = `${tempOne}°`;
  objs.highTemp.textContent = `${tempTwo}°`;
  objs.tempBar.style.background = `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 90%)`;

  determineIconFileSrc(today.day.condition.icon).then((img) => {
    objs.icon.src = img;
  });
}

function getChildObjs(parent) {
  let dayDivs = parent.children;
  let day = dayDivs[0];
  let icon = dayDivs[1];

  let tempSection = dayDivs[2];
  let tempDivs = tempSection.children;
  let lowTemp = tempDivs[0];
  let highTemp = tempDivs[2];
  let tempBar = tempDivs[1];

  return { day, icon, lowTemp, highTemp, tempBar };
}

function createTempBar() {
  const tempBar = document.createElement("div");
  tempBar.className = "tempbar mx-2";
  let colorOne = setColor(tempColors, 55);
  let colorTwo = setColor(tempColors, 83);
  tempBar.style.background = `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 90%)`;

  return tempBar;
}

function createForecastDay() {
  const section = document.createElement("div");
  section.className = "col d-flex align-items-center";

  const day = createElement("Fri");

  const icon = new Image();
  //icon.src = new URL("../assets/day/302.png", import.meta.url);

  const tempBar = createTempBar();

  const tempSection = document.createElement("div");
  tempSection.className = "d-flex align-items-center";
  tempSection.append(createElement("62"), tempBar, createElement("81"));

  section.append(day, icon, tempSection);
  return section;
}

const tempColors = {
  darkblue: 32,
  lightblue: 59,
  lightgreen: 68,
  yellow: 77,
  orange: 86,
  red: 200,
};

function setColor(tempColors, temp) {
  for (let color in tempColors) {
    if (temp < tempColors[color]) {
      return color;
    }
  }
}

export default FutureForecast;
