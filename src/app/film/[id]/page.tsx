import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getImageUrl } from "@/services/omdb";

interface MoviePageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function MoviePage({ params, searchParams }: MoviePageProps) {
  const movie = await getMovieDetails(params.id);

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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Film Posteri */}
          <div className="w-full md:w-1/3">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(movie.Poster)}
                alt={movie.Title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Film Detayları */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                {movie.imdbRating || 'N/A'}
              </span>
              <span className="text-gray-300">{movie.Year}</span>
              <span className="text-gray-300">{movie.Runtime}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Özet</h2>
              <p className="text-gray-300">{movie.Plot || 'Özet bulunamadı.'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Tür</h2>
                <p className="text-gray-300">{movie.Genre || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Yönetmen</h2>
                <p className="text-gray-300">{movie.Director || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Oyuncular</h2>
                <p className="text-gray-300">{movie.Actors || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">IMDB ID</h2>
                <p className="text-gray-300">{movie.imdbID}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <a 
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600"
              >
                IMDB'de Görüntüle
              </a>
              <Link 
                href="/"
                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600"
              >
                Geri Dön
              </Link>
            </div>
          </div>
        </div>
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