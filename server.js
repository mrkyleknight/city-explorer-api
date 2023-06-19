'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT || 3001;


server.get('/movie', getMovieData);
server.get('/weather', getWeatherData);


async function getMovieData(req, res) {
  const city = req.query.searchQuery;

  try {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    const movieResponse = await axios.get(movieUrl);

    const moviesData = movieResponse.data.results.map((movie) => ({
      title: movie.title,
      release_date: movie.release_date,
      imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }));

    res.status(200).json(moviesData);
  } catch (error) {
    res.status(500).send('Error occurred while fetching movie data');
  }
}

async function getWeatherData(req, res) {
  const { lat, lon } = req.query;

  try {
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    const weatherResponse = await axios.get(weatherUrl);

    const forecastData = weatherResponse.data.data.map((day) => ({
      date: day.valid_date,
      description: day.weather.description,
      temp: day.temp,
      highTemp: day.high_temp,
      lowTemp: day.low_temp,
      precip: day.precip,
      cloudCover: day.clouds,
      feelslike: day.app_max_temp,
      humidity: day.rh,
      windSpeed: day.wind_spd
    }));

    res.status(200).json(forecastData);
  } catch (error) {
    res.status(500).send('Error occurred while fetching weather data');
  }
}


server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
