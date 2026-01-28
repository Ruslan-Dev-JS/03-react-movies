import axios, { AxiosResponse } from "axios";
import { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (
  query: string
): Promise<Movie[]> => {
  const response: AxiosResponse<MoviesResponse> = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return response.data.results;
};
