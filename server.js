'use strict';

console.log('Yay! Our first server!');

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`We are running ${PORT}!`));

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
  }
}

app.get('/weather', (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

    console.log('Search Query:', searchQuery);

    let foundCity = data.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

    if (foundCity) {
      let weatherForecast = foundCity.data.map(data => new Forecast(data));
      response.status(200).send(weatherForecast);
    } else {
      response.status(404).send('CANNOT BE FOUND');
    }
  } catch (error) {
    response.status(500).send(error.message);
    next(error);
  }
});