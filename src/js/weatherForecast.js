import Clock from "../assets/misc-icons/clock.png";

const ForecastOfCity = () => {
  const card = document.createElement("div");
  card.className = "mt-2";

  const headerSection = document.createElement("div");

  const headerIcon = new Image();
  headerIcon.alt = "clock";
  headerIcon.src = Clock;

  const header = document.createElement("span");
  header.className = "ms-1";
  header.textContent = "Hourly Forecast";

  headerSection.append(headerIcon, header);

  //Hourly Forecast Section
  const hourlySection = document.createElement("div");
  hourlySection.className = "d-flex align-items-center";

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

    populateForecastDisplay(cardObjs, data);
  };

  card.append(headerSection, hourlySection);

  return { card, update };
};

function populateForecastDisplay(objs, data) {
  objs.cityName.textContent = `${data.location.name}, ${data.location.region}`;
  objs.dateTime.textContent = `${data.location.localtime}`;
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

function createSection(iconSrc, altText) {
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

export default ForecastOfCity;
