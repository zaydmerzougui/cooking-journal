import useTheme from "../hooks/useTheme";
import "./ThemeSelector.css";
import modeIcon from "../assets/brightness_6_black_24dp.svg";
export default function ThemeSelector() {
  const themeColors = ["#58249c", "#249c6b", "#b70233"];
  const { changeColor, changeMode, mode } = useTheme();
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          onClick={toggleMode}
          alt=""
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
      {/* <div
        className="red"
        onClick={(e) => {
          changeColor(e.target.className);
        }}
      ></div>
      <div
        className="blue"
        onClick={(e) => {
          changeColor(e.classList);
        }}
      ></div>
      <div
        className="pink"
        onClick={(e) => {
          changeColor(e.className);
        }}
      ></div> */}
    </div>
  );
}
