import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import trash from "../assets/delete_black_24dp.svg";
// style
import "./RecipeList.css";
import { projectFirestore } from "../firebase/config";

export default function Recipe({ recipes }) {
  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };
  const { mode } = useTheme();
  if (recipes.length === 0) return <div className="error">NO Recipes</div>;
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className={`card ${mode} `} key={recipe.id}>
          <h3>{recipe.title} </h3>
          <p>{recipe.cookingTime} to make. </p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}> Cook This</Link>
          <img 
          src={trash} 
          alt="" 
          onClick={() => handleClick(recipe.id)} />
        </div>
      ))}
    </div>
  );
}
