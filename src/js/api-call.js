const apiKey = "3d62ba0524d94ae9877163800232606";

async function apiCallGenerator(source) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/${source.getSearchTerm()}.json?key=${apiKey}&q=${source.getCity()}&${source.getExtras()}`,
      { mode: "cors" }
    );
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export { apiCallGenerator };
