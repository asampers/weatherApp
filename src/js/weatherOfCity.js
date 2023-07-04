const WeatherOfCity = () => {
  const card = document.createElement("div");

  //Header of Card
  const cityName = document.createElement("div");
  cityName.textContent = "Milwaukee, Wisconsin";
  cityName.className = "h3";

  const dateTime = document.createElement("div");
  dateTime.textContent = "2023-06-29 15:05";
  dateTime.className = "small text-secondary";

  //Main Section
  const mainSection = document.createElement("div");
  mainSection.className = "d-flex flex-column align-items-center";
  const tempSection = document.createElement("div");
  tempSection.className = "d-flex align-items-center ";

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

  const humidity = document.createElement("div");
  humidity.className = "humidity";
  humidity.textContent = "52%";

  const wind = document.createElement("div");
  wind.className = "wind"
  wind.textContent = "9.4 mph ENE";

  const sunrise = document.createElement("div");
  sunrise.className = "sunrise"
  sunrise.textContent = "05:15 AM";

  const sunset = document.createElement("div");
  sunset.className = "sunset"
  sunset.textContent = "08:35 PM";

  miscWeatherSection.append(humidity, wind, sunrise, sunset);
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
  objs.dateTime.textContent = `${data.location.localtime}`;
  objs.temp.textContent = `${data.current.temp_f}°F`;
  objs.condition.textContent = `${data.current.condition.text}`;

  determineIconFileSrc(data.current.condition.icon).then((img) => {
    objs.icon.src = img;
  });
  objs.highTemp.textContent = `H: ${data.forecast.forecastday[0].day.maxtemp_f}°F`;
  objs.lowTemp.textContent = `L: ${data.forecast.forecastday[0].day.mintemp_f}°F`;
  objs.humidity.textContent = `Humidity: ${data.current.humidity}%`;
  objs.wind.textContent = `${data.current.wind_mph} mph ${data.current.wind_dir}`;
  objs.sunrise.textContent = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
  objs.sunset.textContent = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
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

export default WeatherOfCity;
