import "./Search.css";

import React, { useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { useLocation } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  // const url = "http://localhost:3000/recipes?q=" + query;
  // const { data, error, isPending } = useFetch(url);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setIsPending(false);
          setError("no recipes");
          setData([]);
        } else {
          let result = [];
          snapshot.docs.forEach((doc) =>
            result.push({ id: doc.id, ...doc.data() })
          );
          setIsPending(false);
          setData(() => {
            let filteredRecipes = result.filter((recipe) => {
              return recipe.title.includes(query);
            });
            return filteredRecipes;
          });
        }
      });
    return () => {
      unsub();
    };
  }, [query]);

  return (
    <div>
      <h2 className="page-title">Recipes including '{query}'</h2>
      {isPending && <p className="loading">Loading</p>}
      {error && <p className="error">{error}</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
