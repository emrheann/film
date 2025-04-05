import axios from 'axios';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const OMDB_BASE_URL = 'http://www.omdbapi.com';

const omdbApi = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
    type: 'movie',
  },
});

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
  imdbRating?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
}

export const getPopularMovies = async (): Promise<Movie[]> => {
  // OMDB API doğrudan popüler filmler endpoint'i sunmuyor
  // Bu yüzden bazı popüler filmleri arayarak alıyoruz
  const popularTitles = [
    'The Dark Knight',
    'Inception',
    'Interstellar',
    'The Matrix',
    'Pulp Fiction',
    'Forrest Gump',
    'The Godfather',
    'The Shawshank Redemption'
  ];
  
  const movies = await Promise.all(
    popularTitles.map(title => 
      omdbApi.get('', { params: { t: title } })
        .then(response => response.data)
        .catch(() => null)
    )
  );
  
  return movies.filter(movie => movie !== null) as Movie[];
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  // OMDB API doğrudan yakında gelecek filmler endpoint'i sunmuyor
  // Bu yüzden yeni çıkan filmleri arayarak alıyoruz
  const currentYear = new Date().getFullYear();
  const response = await omdbApi.get('', { 
    params: { 
      y: currentYear,
      s: 'movie'
    } 
  });
  
  return response.data.Search || [];
};

export const getMovieDetails = async (imdbId: string): Promise<Movie> => {
  const response = await omdbApi.get('', { params: { i: imdbId } });
  return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await omdbApi.get('', { params: { s: query } });
  return response.data.Search || [];
};

export const getImageUrl = (posterPath: string): string => {
  return posterPath !== 'N/A' ? posterPath : '/placeholder.jpg';
}; 