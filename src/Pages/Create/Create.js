import { useEffect, useRef, useState } from "react";
// import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
// styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setِCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  // const { data, postData } = useFetch("http://localhost:3000/recipes", "POST");
  const history = useHistory();

  // creating new recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    // postData({
    //   title,
    //   ingredients,
    //   method,
    //   cookingTime: cookingTime + " minutes",
    // });

    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };
    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // redirecting the user when we get data response (useFetch)
  // useEffect(() => {
  //   if (data) history.push("/");
  // }, [data, history]);

  //add ingredients
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing))
      setIngredients((prv) => [...prv, ing]);
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add A New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            required
          />
        </label>

        <label>
          <span>Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>

        <p>
          Current Ingredients:
          {ingredients.map((ing) => {
            return <em key={ing}>{ing}, </em>;
          })}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time:</span>
          <input
            type="number"
            onChange={(e) => {
              setِCookingTime(e.target.value);
            }}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn" onClick={() => {}}>
          Create
        </button>
      </form>
    </div>
  );
}
