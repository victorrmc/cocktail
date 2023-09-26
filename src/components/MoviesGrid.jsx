import { useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";
import { Spinner } from "./Spinner";

export function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery();
  const search = query.get("search");

  useEffect(() => {
    if(search != null){
      setIsLoading(true);
      const searchUrl = search
        ? "/search.php?s=" + search
        : "/search.php?s=";
      get(searchUrl).then((data) => {
        setMovies(data.drinks);
        setIsLoading(false);
      });
    }else{
      setIsLoading(false);
      setMovies([]);
    }
  },[search]);

  if (isLoading) {
    return <Spinner />;
  }
  if(movies == null){
  return(
<h1>No se encontro el Cocktail</h1>
  );
}else{
  return (
    <ul className={styles.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.strDrink} movie={movie} />
      ))}
    </ul>
  );
}
 
}
