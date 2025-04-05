import { Suspense } from "react";
import MoviePageClient from "./MoviePageClient";

interface Props {
  params: {
    id: string;
  };
}

export default function MoviePage({ params }: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    }>
      <MoviePageClient movieId={params.id} />
    </Suspense>
  );
} 