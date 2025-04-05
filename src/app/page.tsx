import Image from "next/image";
import Link from "next/link";
import { getPopularMovies, getUpcomingMovies, getImageUrl } from "@/services/tmdb";

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const upcomingMovies = await getUpcomingMovies();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-yellow-500">Sinefil</Link>
            <div className="flex items-center space-x-6">
              <Link href="/filmler" className="hover:text-yellow-500">Filmler</Link>
              <Link href="/diziler" className="hover:text-yellow-500">Diziler</Link>
              <Link href="/en-iyiler" className="hover:text-yellow-500">En İyiler</Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Film veya dizi ara..."
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <Image
              src={getImageUrl(popularMovies[0].backdrop_path)}
              alt={popularMovies[0].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent">
              <div className="absolute bottom-0 p-8">
                <h2 className="text-4xl font-bold mb-2">{popularMovies[0].title}</h2>
                <p className="text-gray-300 mb-4">
                  {new Date(popularMovies[0].release_date).getFullYear()} • {popularMovies[0].vote_average.toFixed(1)} Puan
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                    {popularMovies[0].vote_average.toFixed(1)}
                  </span>
                  <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600">
                    İzle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popüler Filmler */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popüler Filmler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularMovies.slice(1, 5).map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <div className="relative h-64">
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 font-bold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yakında */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Yakında</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingMovies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <div className="relative h-64">
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Yakında
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {new Date(movie.release_date).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Sinefil</h3>
              <p className="text-gray-400">En iyi film ve dizileri keşfedin.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
              <ul className="space-y-2">
                <li><Link href="/hakkimizda" className="text-gray-400 hover:text-yellow-500">Hakkımızda</Link></li>
                <li><Link href="/iletisim" className="text-gray-400 hover:text-yellow-500">İletişim</Link></li>
                <li><Link href="/gizlilik" className="text-gray-400 hover:text-yellow-500">Gizlilik Politikası</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Bizi Takip Edin</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-500">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-yellow-500">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-yellow-500">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
