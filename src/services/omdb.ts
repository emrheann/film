import axios from 'axios';
import { Movie } from '@/types/movie';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com';

const omdbApi = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

interface SearchResponse {
  Search: Array<{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }>;
  totalResults: string;
  Response: string;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const popularTitles = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight'];
  const movies = await Promise.all(
    popularTitles.map(title => getMovieDetails(title))
  );
  return movies;
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const currentYear = new Date().getFullYear();
  const response = await omdbApi.get<SearchResponse>('/', {
    params: {
      s: 'movie',
      y: currentYear,
      type: 'movie',
    },
  });

  if (response.data.Response === 'True') {
    const movies = await Promise.all(
      response.data.Search.map(movie => getMovieDetails(movie.imdbID))
    );
    return movies;
  }

  return [];
}

export async function getMovieDetails(imdbId: string): Promise<Movie> {
  const response = await omdbApi.get<Movie>('/', {
    params: {
      i: imdbId,
      plot: 'full',
    },
  });

  return response.data;
}

export async function searchMovies(query: string) {
  const response = await omdbApi.get<SearchResponse>('/', {
    params: {
      s: query,
      type: 'movie',
    },
  });

  if (response.data.Response === 'True') {
    return response.data.Search;
  }

  return [];
}

export function getImageUrl(posterUrl: string | undefined) {
  if (!posterUrl || posterUrl === 'N/A') {
    return 'https://via.placeholder.com/300x450?text=No+Poster';
  }
  return posterUrl;
} 