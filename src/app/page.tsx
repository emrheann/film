"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getImageUrl } from "@/services/omdb";

// Örnek film listesi (daha sonra veritabanından gelecek)
const myMovies = [
  { imdbID: "tt0816692", title: "Yıldızlararası", rating: 9.5, dateAdded: "2024-04-05", notes: "En sevdiğim bilim kurgu filmi" },
  { imdbID: "tt1375666", title: "Başlangıç", rating: 9.2, dateAdded: "2024-04-04", notes: "Zihin bükücü bir film" },
  { imdbID: "tt0111161", title: "Esaretin Bedeli", rating: 9.8, dateAdded: "2024-04-03", notes: "Tüm zamanların en iyi filmi" },
];

type ViewMode = "list" | "grid" | "compact";
type SortOption = "date" | "rating" | "title";
type FilterOption = "all" | "high-rated" | "recent";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Film detaylarını al
  useState(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const movieDetails = await Promise.all(
          myMovies.map(async (movie) => {
            const details = await getMovieDetails(movie.imdbID);
            return {
              ...details,
              myRating: movie.rating,
              dateAdded: movie.dateAdded,
              myNotes: movie.notes,
            };
          })
        );
        setMovies(movieDetails);
      } catch (error) {
        console.error("Film detayları alınırken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Sıralama fonksiyonu
  const sortMovies = (movies: any[]) => {
    return [...movies].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case "rating":
          return b.myRating - a.myRating;
        case "title":
          return a.Title.localeCompare(b.Title);
        default:
          return 0;
      }
    });
  };

  // Filtreleme fonksiyonu
  const filterMovies = (movies: any[]) => {
    return movies.filter((movie) => {
      if (filterBy === "high-rated") return movie.myRating >= 8;
      if (filterBy === "recent") {
        const date = new Date(movie.dateAdded);
        const now = new Date();
        const diffDays = Math.ceil((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }
      return true;
    });
  };

  // Arama fonksiyonu
  const searchMovies = (movies: any[]) => {
    if (!searchQuery) return movies;
    const query = searchQuery.toLowerCase();
    return movies.filter(
      (movie) =>
        movie.Title.toLowerCase().includes(query) ||
        movie.myNotes?.toLowerCase().includes(query)
    );
  };

  // İşlenmiş film listesi
  const processedMovies = searchMovies(filterMovies(sortMovies(movies)));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-yellow-500">Film Listem</Link>
            <div className="flex items-center space-x-6">
              <Link href="/film-ekle" className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Film Ekle
              </Link>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Film ara..."
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Film Listesi */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">İzlediğim Filmler</h2>
            <div className="flex space-x-4">
              {/* Görüntüleme Modu */}
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-gray-600" : "hover:bg-gray-600"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-gray-600" : "hover:bg-gray-600"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "compact" ? "bg-gray-600" : "hover:bg-gray-600"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Sıralama */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none pr-8"
                >
                  <option value="date">Eklenme Tarihi</option>
                  <option value="rating">Puan</option>
                  <option value="title">Başlık</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Filtreleme */}
              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none pr-8"
                >
                  <option value="all">Tümü</option>
                  <option value="high-rated">Yüksek Puanlı</option>
                  <option value="recent">Son Eklenenler</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Filmler yükleniyor...</p>
            </div>
          ) : processedMovies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Henüz film eklenmemiş.</p>
              <Link href="/film-ekle" className="inline-block mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Film Ekle
              </Link>
            </div>
          ) : (
            <div className={`space-y-4 ${
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""
            }`}>
              {processedMovies.map((movie) => (
                <Link href={`/film/${movie.imdbID}`} key={movie.imdbID}>
                  <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700 transition-colors ${
                    viewMode === "compact" ? "flex items-center" : ""
                  }`}>
                    <div className={`relative ${
                      viewMode === "compact" ? "h-24 w-16" : "h-48 md:h-32 md:w-24"
                    }`}>
                      <Image
                        src={getImageUrl(movie.Poster)}
                        alt={movie.Title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={`p-4 ${viewMode === "compact" ? "flex-1" : ""}`}>
                      <div className={`flex ${
                        viewMode === "compact" ? "items-center justify-between" : "flex-col md:flex-row md:items-center md:justify-between"
                      }`}>
                        <h3 className={`font-semibold ${
                          viewMode === "compact" ? "text-lg" : "text-xl"
                        }`}>{movie.Title}</h3>
                        <div className={`flex items-center space-x-4 ${
                          viewMode === "compact" ? "ml-4" : "mt-2 md:mt-0"
                        }`}>
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-500 font-bold">IMDB: {movie.imdbRating}</span>
                            <span className="text-green-500 font-bold">Benim: {movie.myRating}</span>
                          </div>
                          <span className="text-gray-400 text-sm">{movie.dateAdded}</span>
                        </div>
                      </div>
                      {viewMode !== "compact" && (
                        <>
                          <div className="mt-2 text-gray-300 text-sm">
                            {movie.Year} • {movie.Runtime} • {movie.Genre}
                          </div>
                          {movie.myNotes && (
                            <div className="mt-2 text-gray-400 text-sm italic">
                              "{movie.myNotes}"
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Film Listem</h3>
            <p className="text-gray-400">İzlediğiniz filmleri kaydedin, değerlendirin ve notlar alın.</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
