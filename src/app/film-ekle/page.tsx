import Link from "next/link";
import { searchMovies } from "@/services/omdb";

export default function FilmEklePage() {
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Film Ekle</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="search" className="block text-lg font-medium mb-2">
                  Film Ara
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="search"
                    placeholder="Film adı girin..."
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600"
                  >
                    Ara
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-lg font-medium mb-2">
                  Puanınız
                </label>
                <input
                  type="number"
                  id="rating"
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder="0-10 arası puan verin"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-lg font-medium mb-2">
                  Notlarınız
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Film hakkında notlarınızı yazın..."
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Link
                  href="/"
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
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