import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3";

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await axios.get<MovieResponse>(`${API_URL}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
