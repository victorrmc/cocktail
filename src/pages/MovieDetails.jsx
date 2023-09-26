import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "../components/Spinner";
import { get } from "../utils/httpClient";
import styles from "./MovieDetails.module.css";

export function MovieDetails() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const ingredientes = [];
    get("/lookup.php?i=" + movieId).then((data) => {
      setMovie(data.drinks[0]);
      setIsLoading(false);
      data.drinks.forEach(element => {
      Object.entries(element).forEach(([key, value]) =>{
        if(key.includes("strIngredient")){
          if(value != null){
            ingredientes.push(value);
          }
        }
      });
    });
    setIngredientes(ingredientes);
    });
  }, [movieId]);

 

  if (isLoading) {
    return <Spinner />;
  }

  const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  return (
    <div className={styles.detailsContainer}>
      <img
        className={`${styles.col} ${styles.movieImage}`}
        src={movie.strDrinkThumb}
        alt={movie.strDrink}
      />
      <div className={`${styles.col} ${styles.movieDetails}`}>
        <p className={styles.firstItem}>
          <strong>Title:</strong> {movie.strDrink}
        </p>  
        <p>
          <strong>Glass:</strong> {movie.strGlass}
        </p>
       
        <p>
          <strong>Description:</strong> {movie.strInstructions}
        </p>
        
      </div>
      {ingredientes.map(ingrediente => (
  <img key={ingrediente}
    className={`${styles.col} ${styles.movieIngredientes}`}
    src={`https://www.thecocktaildb.com/images/ingredients/${ingrediente}.png`}
    alt={movie.strDrink}/>
        // <p key={ingrediente}>`${ingrediente}`</p>
))}
    </div>
  );
}
