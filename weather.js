const axios = require('axios');
const data = require('./data/weather.json');

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
    this.temp = cityObj.temp;
    this.highTemp = cityObj.high_temp;
    this.lowTemp = cityObj.low_temp;
    this.precip = cityObj.precip;
    this.cloudCover = cityObj.clouds;
    this.feelsLike = cityObj.app_temp;
    this.humidity = cityObj.dewpt;
    this.windSpeed = cityObj.wind_spd;
  }
}

class Weather {
  constructor() {
    this.data = data;
  }

  getWeather(city) {
    const cityData = this.data.find((item) => item.city_name.toLowerCase() === city.toLowerCase());
    if (cityData) {
      const forecasts = cityData.data.map((cityObj) => new Forecast(cityObj));
      return forecasts;
    } else {
      return [];
    }
  }
}

module.exports = Weather;
