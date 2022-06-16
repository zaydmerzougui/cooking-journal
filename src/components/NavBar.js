import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

//style
import "./NavBar.css";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { color } = useTheme();
  return (
    <div className="nav" style={{ background: color }}>
      <nav>
        <NavLink className="brand" to="/">
          <h1>Cooking Ninja</h1>
        </NavLink>
        <SearchBar />
        <NavLink to="/create">Create Recipe</NavLink>
      </nav>
    </div>
  );
}
