import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <div>
      <ul className={css.grid}>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => onSelect(movie)}>
            <div className={css.card}>
              <span className={css.rating}>
                {movie.vote_average.toFixed(1)}
              </span>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
              <h2 className={css.title}>{movie.title}</h2>
              <p className={css.date}>{movie.release_date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
