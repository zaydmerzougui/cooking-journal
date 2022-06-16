import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";
// components
import RecipeList from "../../components/RecipeList";

//styles
import "./Home.css";
// import useFetch from "../../hooks/useFetch";

export default function Home() {
  // const {data,error,isPending}=useFetch('http://localhost:3000/recipes')
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("no recipes to load");
          setIsPending(false);
          setData([]);
        } else {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          setData(result);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
