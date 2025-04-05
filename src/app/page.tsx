import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Film Dünyası</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Film Kartı 1 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48">
              <Image
                src="/film1.jpg"
                alt="Film 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Film Adı 1</h2>
              <p className="text-gray-400">Film açıklaması burada yer alacak.</p>
            </div>
          </div>

          {/* Film Kartı 2 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48">
              <Image
                src="/film2.jpg"
                alt="Film 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Film Adı 2</h2>
              <p className="text-gray-400">Film açıklaması burada yer alacak.</p>
            </div>
          </div>

          {/* Film Kartı 3 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48">
              <Image
                src="/film3.jpg"
                alt="Film 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Film Adı 3</h2>
              <p className="text-gray-400">Film açıklaması burada yer alacak.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
