import { getMovieDetails } from "@/services/omdb";
import MoviePageClient from "./MoviePageClient";

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovieDetails(params.id);

  return <MoviePageClient movieId={params.id} initialMovie={movie} />;
} 