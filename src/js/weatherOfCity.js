const WeatherOfCity = () => {
  const card = document.createElement("div");

  //Header of Card
  const cityName = document.createElement("div");
  cityName.textContent = "Milwaukee, Wisconsin";

  const dateTime = document.createElement("div");
  dateTime.textContent = "2023-06-29 15:05";

  //Main Temperature Section
  const tempSection = document.createElement("div");

  const temp = document.createElement("div");
  temp.textContent = "84.2°F";

  const condition = document.createElement("div");
  condition.textContent = "Moderate rain";

  const icon = new Image();
  icon.src = new URL("../assets/day/302.png", import.meta.url);
  console.log(`${import.meta.url}`);
  const highTemp = document.createElement("div");
  highTemp.textContent = "84.2°F";

  const lowTemp = document.createElement("div");
  lowTemp.textContent = "61.7°F";

  tempSection.append(temp, condition, icon, highTemp, lowTemp);

  //Miscellaneous Weather Section
  const miscWeatherSection = document.createElement("div");

  const feelsLike = document.createElement("div");
  feelsLike.textContent = "89.2°F";

  const humidity = document.createElement("div");
  humidity.textContent = "52%";

  const windSpeed = document.createElement("div");
  windSpeed.textContent = "9.4 mph";

  const windDir = document.createElement("div");
  windDir.textContent = "ENE";

  const sunrise = document.createElement("div");
  sunrise.textContent = "05:15 AM";

  const sunset = document.createElement("div");
  sunset.textContent = "08:35 PM";

  miscWeatherSection.append(
    feelsLike,
    humidity,
    windSpeed,
    windDir,
    sunrise,
    sunset
  );
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
      feelsLike,
      humidity,
      windSpeed,
      windDir,
      sunrise,
      sunset,
    };

    populateWeatherDisplay(cardObjs, data);
  };

  card.append(cityName, dateTime, tempSection, miscWeatherSection);

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
  objs.feelsLike.textContent = `Feels like: ${data.current.feelslike_f}°F`;
  objs.humidity.textContent = `Humidity: ${data.current.humidity}%`;
  objs.windSpeed.textContent = `${data.current.wind_mph} mph`;
  objs.windDir.textContent = `${data.current.wind_dir}`;
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
