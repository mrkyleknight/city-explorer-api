const axios = require('axios');

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.averageVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    this.popularity = movie.popularity;
    this.releasedOn = movie.release_date;
    this.timestamp = Date.now();
  }
}

class Movies {
  constructor() {
    
  }

  async getMovies(city) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
      const response = await axios.get(url);
      const movies = response.data.results.map((movie) => new Movie(movie));
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }
}

module.exports = Movies;
