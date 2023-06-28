const apiKey = "3d62ba0524d94ae9877163800232606";
let city = "miami";
let searchTerm = "search";
let extras = "";

async function apiCallGenerator() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/${searchTerm}.json?key=${apiKey}&q=${city}&${extras}`,
      { mode: "cors" }
    );
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export { apiCallGenerator };
