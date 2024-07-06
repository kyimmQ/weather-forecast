const axios = require("axios");
const path = require("path");
const fs = require("fs");

const getData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/weather?city=${encodeURIComponent("Ho Chi Minh")}`
    );
    const weatherData = response.data;

    // Define the path to the JSON file
    const filePath = path.join(__dirname, "mockWeatherData.json");

    // Write the data to the JSON file
    fs.writeFile(filePath, JSON.stringify(weatherData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log("Data successfully written to file");
      }
    });
  } catch (error) {
    console.error("Error fetching data");
  }
};
getData();
