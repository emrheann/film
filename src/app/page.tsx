import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getImageUrl } from "@/services/omdb";

// Örnek film listesi (daha sonra veritabanından gelecek)
const myMovies = [
  { imdbID: "tt0816692", title: "Interstellar", rating: 8.6, dateAdded: "2024-04-05" },
  { imdbID: "tt1375666", title: "Inception", rating: 8.8, dateAdded: "2024-04-04" },
  { imdbID: "tt0111161", title: "The Shawshank Redemption", rating: 9.3, dateAdded: "2024-04-03" },
];

export default async function Home() {
  // Film detaylarını al
  const movies = await Promise.all(
    myMovies.map(async (movie) => {
      const details = await getMovieDetails(movie.imdbID);
      return {
        ...details,
        myRating: movie.rating,
        dateAdded: movie.dateAdded,
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-yellow-500">Film Listem</Link>
            <div className="flex items-center space-x-6">
              <Link href="/film-ekle" className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">
                Film Ekle
              </Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Film ara..."
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Film Listesi */}
        <section>
          <h2 className="text-2xl font-bold mb-6">İzlediğim Filmler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <Link href={`/film/${movie.imdbID}`} key={movie.imdbID}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                  <div className="relative h-64">
                    <Image
                      src={getImageUrl(movie.Poster)}
                      alt={movie.Title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500 font-bold">IMDB: {movie.imdbRating}</span>
                        <span className="text-green-500 font-bold">Benim: {movie.myRating}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{movie.dateAdded}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Film Listem</h3>
            <p className="text-gray-400">İzlediğiniz filmleri kaydedin ve değerlendirin.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
