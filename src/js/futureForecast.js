import Calendar from "../assets/misc-icons/calendar.png";
import { format } from "date-fns";

const FutureForecast = () => {
  const card = document.createElement("div");
  card.className = "future-forecast mt-4";

  const headerSection = document.createElement("div");
  headerSection.className = "d-flex align-items-center";

  const headerIcon = new Image();
  headerIcon.alt = "calendar";
  headerIcon.src = Calendar;

  const header = document.createElement("span");
  header.className = "ms-2";
  header.textContent = "Future Forecast";

  headerSection.append(headerIcon, header);

  //Daily Forecast Section
  const dailySection = document.createElement("div");
  dailySection.className = "row my-2 mx-1 daily";

  const dayOne = createSection();
  dayOne.classList.add("col");
  const dayTwo = createSection();
  dayTwo.classList.add("col");
  dailySection.append(dayOne, dayTwo);

  //End of Miscellaneous weather section

  const update = (data) => {
    let days = dailySection.children;
    let ind = 1;
    for (let i = 0; i < days.length; i++) {
      let dayDivs = days[i].children;
      let day = dayDivs[0];
      let icon = dayDivs[1];
      let tempSection = dayDivs[2];
      let tempDivs = tempSection.children;
      let lowTemp = tempDivs[0];
      let highTemp = tempDivs[2];
      let tempBar = tempDivs[1];
      let dayObjs = {
        day,
        icon,
        lowTemp,
        highTemp,
        tempBar,
      };
      populateFutureDisplay(dayObjs, data, ind);
      ind++;
    }
  };
  card.append(headerSection, dailySection);

  return { card, update };
};

function populateFutureDisplay(objs, data, ind) {
  let tempOne = formatTemp(`${data.forecast.forecastday[ind].day.mintemp_f}`);
  let tempTwo = formatTemp(`${data.forecast.forecastday[ind].day.maxtemp_f}`);
  let colorOne = setColor(tempColors, tempOne);
  let colorTwo = setColor(tempColors, tempTwo);

  objs.day.textContent = formatDay(data.forecast.forecastday[ind].date);
  determineIconFileSrc(data.forecast.forecastday[ind].day.condition.icon).then(
    (img) => {
      objs.icon.src = img;
    }
  );
  objs.lowTemp.textContent = `${tempOne}°`;
  objs.highTemp.textContent = `${tempTwo}°`;
  objs.tempBar.style.background = `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 90%)`;
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
  section.className = "d-flex align-items-center";

  const day = createElement("Fri");

  const icon = new Image();
  icon.src = new URL("../assets/day/302.png", import.meta.url);

  const tempBar = document.createElement("div");
  tempBar.className = "tempbar mx-2";
  let colorOne = setColor(tempColors, 55);
  let colorTwo = setColor(tempColors, 83);
  tempBar.style.background = `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 90%)`;

  const tempSection = document.createElement("div");
  tempSection.className = "d-flex align-items-center";
  tempSection.append(createElement("62"), tempBar, createElement("81"));

  section.append(day, icon, tempSection);
  return section;
}

function formatDay(string) {
  let date = new Date(`${string} 00:00`);
  let day = format(date, "EEE");
  return day;
}

function formatTemp(string) {
  let temp = string.replace(/\.\d/, "");
  return temp;
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
