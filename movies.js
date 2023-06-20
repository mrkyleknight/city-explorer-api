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
  constructor(cache) {
    this.cache = cache;
  }

  async getMovies(city) {
    try {
      const cacheKey = `movies:${city}`;
      const cachedResult = this.cache.get(cacheKey);
      
      if (cachedResult && this.isRecent(cachedResult.timestamp)) {
        console.log('Cache hit!');
        return cachedResult.movies;
      }
      
      console.log('Cache miss!');
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
      const response = await axios.get(url);
      const movies = response.data.results.map((movie) => new Movie(movie));
      const result = { movies, timestamp: Date.now() };
      
      this.cache.set(cacheKey, result);
      
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }

  isRecent(timestamp) {
    
    const cacheInvalidationTimespan = 60 * 60 * 1000; 
    const currentTime = Date.now();
    return currentTime - timestamp <= cacheInvalidationTimespan;
  }
}

module.exports = Movies;
