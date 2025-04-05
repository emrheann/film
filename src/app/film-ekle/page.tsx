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
              <Link href="/film-ekle" className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Film Ekle
              </Link>
              <div className="relative">
                <input
                  type="text"
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
                    className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    Ara
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  IMDB veritabanında arama yaparak film ekleyebilirsiniz.
                </p>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-lg font-medium mb-2">
                  Puanınız
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    id="rating"
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span id="ratingValue" className="text-yellow-500 font-bold">5.0</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  0-10 arası bir puan verin
                </p>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-lg font-medium mb-2">
                  Notlarınız
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Film hakkında düşüncelerinizi yazın..."
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
                <p className="mt-2 text-sm text-gray-400">
                  Film hakkında kısa notlar alabilirsiniz.
                </p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Link
                  href="/"
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">İpuçları</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Film adını doğru yazdığınızdan emin olun</li>
              <li>Yıl bilgisi ekleyerek daha doğru sonuçlar alabilirsiniz</li>
              <li>Puanınızı verirken objektif olmaya çalışın</li>
              <li>Notlarınızı düzenli tutun, ileride faydalı olacaktır</li>
            </ul>
          </div>
        </div>
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