import { Movie } from './omdb';

export interface UserMovie extends Movie {
  userRating: number;
  userNotes: string;
  dateAdded: string;
}

// Veritabanı anahtarları
const DB_KEYS = {
  USER_MOVIES: 'user_movies',
};

// Kullanıcının film listesini al
export function getUserMovies(): UserMovie[] {
  if (typeof window === 'undefined') return [];
  
  const moviesJson = localStorage.getItem(DB_KEYS.USER_MOVIES);
  if (!moviesJson) return [];
  
  try {
    return JSON.parse(moviesJson);
  } catch (err) {
    console.error("Film listesi parse hatası:", err);
    return [];
  }
}

// Film ekle veya güncelle
export function saveUserMovie(movie: UserMovie): void {
  if (typeof window === 'undefined') return;
  
  const movies = getUserMovies();
  const index = movies.findIndex((m) => m.imdbID === movie.imdbID);
  
  if (index !== -1) {
    // Film zaten varsa güncelle
    movies[index] = movie;
  } else {
    // Yeni film ekle
    movies.push(movie);
  }
  
  localStorage.setItem(DB_KEYS.USER_MOVIES, JSON.stringify(movies));
}

// Film sil
export function deleteUserMovie(imdbId: string): void {
  if (typeof window === 'undefined') return;
  
  const movies = getUserMovies();
  const filteredMovies = movies.filter((movie) => movie.imdbID !== imdbId);
  
  localStorage.setItem(DB_KEYS.USER_MOVIES, JSON.stringify(filteredMovies));
}

// Belirli bir filmi getir
export function getUserMovie(imdbId: string): UserMovie | null {
  const movies = getUserMovies();
  return movies.find((movie) => movie.imdbID === imdbId) || null;
}

// Filmleri sırala
export function sortUserMovies(a: UserMovie, b: UserMovie, sortBy: 'date' | 'rating' | 'title'): number {
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
}

// Filmleri filtrele
export function filterUserMovies(movie: UserMovie, filterBy: 'all' | 'high-rated' | 'recent'): boolean {
  switch (filterBy) {
    case 'high-rated':
      return movie.userRating >= 8;
    case 'recent':
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(movie.dateAdded) >= thirtyDaysAgo;
    default:
      return true;
  }
}

// Filmlerde ara
export function searchUserMovies(movie: UserMovie, query: string): boolean {
  if (!query) return true;
  
  const searchTerm = query.toLowerCase();
  return (
    movie.Title.toLowerCase().includes(searchTerm) ||
    movie.userNotes.toLowerCase().includes(searchTerm)
  );
} 