'use strict';

console.log('Yay! Our first server!');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

let data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`We are running ${PORT}!`));

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



// app.listen(PORT, () => console.log('Running on port'))


app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    // let searchQuery = request.query.searchQuery;

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&units=I&key=${process.env.WEATHER_API_KEY}`;
    console.log(weatherURL);

    let weatherDataAxios = await axios.get(weatherURL);
    console.log(weatherDataAxios);
    if (weatherDataAxios) {
      let cityWeather = weatherDataAxios.data.data.map((date) => {
        return new Forecast(date);
      });
      response.status(200).send(cityWeather);
    }

    // console.log('Search Query:', searchQuery);

    // let foundCity = data.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

    // if (foundCity) {
    //   let weatherForecast = foundCity.data.map(data => new Forecast(data));
    //   response.status(200).send(weatherForecast);
    // } else {
    //   response.status(404).send('CANNOT BE FOUND');
    // }






  } catch (error) {
    response.status(500).send(error.message);
    next(error);
  }
});

app.get('/movies', async (request, response, next)=> { 
  try {

    let keywordFromFrontend = request.query.searchQuery;

    let url = `https://api.themovieb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${keywordFrontend}`;

    let dataFromAxios = await axios.get(url);

    let dataToSend = dataFromAxios.data.results.map(movieObj => new Movie(movieObj));

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

class Movie {
constructor(movieObj) {
  this.title = movieObj.title;
  this.overview = movieObj.title;
}
}
