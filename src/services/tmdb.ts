import axios from 'axios';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'tr-TR',
  },
});

export const getPopularMovies = async () => {
  const response = await tmdbApi.get('/movie/popular');
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await tmdbApi.get('/movie/upcoming');
  return response.data.results;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const searchMovies = async (query: string) => {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
    },
  });
  return response.data.results;
};

export const getImageUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`;
}; 