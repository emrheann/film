import { getMovieDetails } from "@/services/omdb";
import MoviePageClient from "./MoviePageClient";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function MoviePage({ params, searchParams }: Props) {
  const movie = await getMovieDetails(params.id);

  return <MoviePageClient movieId={params.id} initialMovie={movie} />;
} 