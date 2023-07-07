import Calendar from "../assets/misc-icons/calendar.png";
import { format } from "date-fns";

const FutureForecast = () => {
  const card = document.createElement("div");
  card.className = "mt-2";

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
  dailySection.className = "d-flex align-items-center my-2 daily";

  const dayOne = createSection();
  const dayTwo = createSection();
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
      let highTemp = tempDivs[1];
      let dayObjs = {
        day,
        icon,
        lowTemp,
        highTemp,
      };
      //console.log(data.forecast.forecastday[ind].date);
      populateFutureDisplay(dayObjs, data, ind);
      ind++;
    }
  };
  card.append(headerSection, dailySection);

  return { card, update };
};

function populateFutureDisplay(objs, data, ind) {
  objs.day.textContent = formatDay(data.forecast.forecastday[ind].date);

  determineIconFileSrc(data.forecast.forecastday[ind].day.condition.icon).then(
    (img) => {
      objs.icon.src = img;
    }
  );

  objs.lowTemp.textContent = formatTemp(
    `${data.forecast.forecastday[ind].day.mintemp_f}`
  );
  objs.highTemp.textContent = formatTemp(
    `${data.forecast.forecastday[ind].day.maxtemp_f}`
  );
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

  const tempSection = document.createElement("div");
  tempSection.className = "d-flex align-items-center";
  tempSection.append(createElement("62"), createElement("81"));

  section.append(day, icon, tempSection);
  return section;
}

function formatDay(string) {
  let date = new Date(`${string} 00:00`);
  let day = format(date, "EEE");
  console.log(day);
  return day;
}

function formatTemp(string) {
  let temp = string.replace(/\.\d/, "");
  return `${temp}°`;
}

export default FutureForecast;
