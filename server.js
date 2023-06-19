'use strict';

console.log('Yay! Our first server!');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const Weather = require('./weather');
const Movies = require('./movies');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`We are running ${PORT}!`));

const weather = new Weather();
const movies = new Movies();


app.get('/weather', (req, res) => {
  const city = req.query.city;
  const forecasts = weather.getWeather(city);
  res.json(forecasts);
});


app.get('/movies', async (req, res) => {
  const city = req.query.city;
  const moviesList = await movies.getMovies(city);
  res.json(moviesList);
});
