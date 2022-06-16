import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useTheme from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";
import trash from "../../assets/delete_black_24dp.svg";

// styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  const handleDelete = () => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  // const url = "http://localhost:3000/recipes/" + id;
  // const { data: recipe, isPending, error } = useFetch(url);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (error) history.push("/");
  //   }, 1000);
  // }, [history, error]);
  // const handleDel = () => {
  //   fetch(url, {
  //     method: "DELETE",
  //   });
  //   history.push("/");
  // };

  useEffect(() => {
    setIsPending(true);
    const unsnup = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("could not find the recipe");
          history.push("/");
        }
      });
    return () => unsnup();
  }, [id, history]);
  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "something  diffrent",
    });
  };
  return (
    <div className={`recipe ${mode}`}>
      {isPending && <div className="loading">Loading..</div>}
      {error && <div className="error">{error} </div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p className="">Takes {recipe.cookingTime} to make. </p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing} </li>
            ))}
          </ul>
          <p className="method"> {recipe.method}</p>
          {/* <button
            className="del"
            // onClick={() => handleDel(id)}
          >
            Delete
          </button> */}
          <img src={trash} alt="" onClick={() => handleDelete(recipe.id)} />
          <button onClick={handleClick}>Update</button>
        </>
      )}
    </div>
  );
}
