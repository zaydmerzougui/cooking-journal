import { useEffect } from "react";
import { useState } from "react";

export default function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState(null);
  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (fetchOptions) => {
      setIsPending(true);
      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        setIsPending(false);
        setData(json);
        setError(false);
      } catch (err) {
        setIsPending(false);
        if (err.name === "abortError") console.log("the fetch was abotred");
        else {
          setError("could not fetch the data");
        }
      }
    };
    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }
    return () => {
      controller.abort();
    };
  }, [url, options, method]);
  return { data, isPending, error, postData };
}
