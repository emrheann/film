import { Movie, UserMovie } from '@/types/movie';

const DB_KEYS = {
  USER_MOVIES: 'userMovies',
} as const;

export function getUserMovies(): UserMovie[] {
  if (typeof window === 'undefined') return [];

  try {
    const movies = localStorage.getItem(DB_KEYS.USER_MOVIES);
    return movies ? JSON.parse(movies) : [];
  } catch (err) {
    console.error('Film listesi alınırken hata:', err);
    return [];
  }
}

export function saveUserMovie(movie: UserMovie): void {
  const movies = getUserMovies();
  const existingIndex = movies.findIndex(m => m.imdbID === movie.imdbID);

  if (existingIndex >= 0) {
    movies[existingIndex] = movie;
  } else {
    movies.push(movie);
  }

  localStorage.setItem(DB_KEYS.USER_MOVIES, JSON.stringify(movies));
}

export function deleteUserMovie(imdbId: string): void {
  const movies = getUserMovies();
  const filteredMovies = movies.filter(movie => movie.imdbID !== imdbId);
  localStorage.setItem(DB_KEYS.USER_MOVIES, JSON.stringify(filteredMovies));
}

export function getUserMovie(imdbId: string): UserMovie | null {
  const movies = getUserMovies();
  return movies.find(movie => movie.imdbID === imdbId) || null;
}

export function sortUserMovies(movies: UserMovie[], sortBy: 'date' | 'rating' | 'title'): UserMovie[] {
  return [...movies].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'rating':
        return b.userRating - a.userRating;
      case 'title':
        return a.Title.localeCompare(b.Title);
      default:
        return 0;
    }
  });
}

export function filterUserMovies(movies: UserMovie[], filterBy: 'all' | 'high-rated' | 'recent'): UserMovie[] {
  switch (filterBy) {
    case 'high-rated':
      return movies.filter(movie => movie.userRating >= 8);
    case 'recent':
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return movies.filter(movie => new Date(movie.dateAdded) >= oneMonthAgo);
    default:
      return movies;
  }
}

export function searchUserMovies(movies: UserMovie[], query: string): UserMovie[] {
  const searchTerm = query.toLowerCase();
  return movies.filter(movie => 
    movie.Title.toLowerCase().includes(searchTerm) ||
    movie.userNotes.toLowerCase().includes(searchTerm)
  );
} 