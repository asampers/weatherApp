import { format } from "date-fns";

function determineIconFileName(string) {
  let stringToRemove = "//cdn.weatherapi.com/weather/64x64";
  let endToRemove = ".png";
  let remainder = string.replace(stringToRemove, "");
  let fileName = remainder.replace(endToRemove, "");
  return fileName;
}

async function determineIconFileSrc(icon) {
  let fileName = determineIconFileName(icon);
  let module = await import(
    /* webpackMode: "lazy-once", webpackChunkName: "assets/img" */ `../assets${fileName}.png`
  );
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

function formatDayTime(string, style) {
  let date = new Date(string);
  let formatted = format(date, style);

  return formatted;
}

function formatTemp(string) {
  let temp = string.replace(/\.\d/, "");

  return temp;
}

function determineDay(data, index) {
  let day = data.forecast.forecastday[index];

  return day;
}

export {
  determineIconFileSrc,
  createElement,
  createIconSection,
  formatDayTime,
  formatTemp,
  determineDay,
};
