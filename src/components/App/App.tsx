import css from "./App.module.css"; 
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from 'react-paginate';
import { useQuery, keepPreviousData } from '@tanstack/react-query';


import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("No movies found for your request.");



export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const movies = data?.results || [];

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };



  useEffect(() => {
    if (!isLoading && data && data.results.length === 0 && query) {
      notify();
    }
  }, [data, isLoading, query]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && !isLoading && (
        <>
          <MovieGrid movies={movies} onSelect={openModal} />
          <ReactPaginate
            pageCount={data?.total_pages || 0}
           pageRangeDisplayed={5}
           marginPagesDisplayed={1}
           onPageChange={({ selected }) => setPage(selected + 1)}
           forcePage={page - 1}
           containerClassName={css.pagination}
           activeClassName={css.active}
           nextLabel="→"
           previousLabel="←"
          />
        </>
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
