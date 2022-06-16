import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?q=${term}`);
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          value={term}
        />
      </form>
    </div>
  );
}
