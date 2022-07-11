import React, { useContext } from "react";
import { Theme } from "./App";
import themeChanger from "../utils/themeChanger";
// import "../index.css";

const Header = (props) => {
  const [theme, setTheme] = useContext(Theme);
  const handleThemeChanger = () => {
    setTheme(!theme);
    if (theme) {
      localStorage.removeItem("lightTheme");
    } else {
      localStorage.setItem("lightTheme", true);
    }
  };

  return (
    <header className="header">
      <a
        href="https://github.com/klimetzc/mesto-react"
        target="_blank"
        className={`header__logo ${theme && "header__logo_theme_light"}`}
        rel="noreferrer"
      >
        ㅤ
      </a>
      <button
        onClick={handleThemeChanger}
        type="button"
        className={`theme-changer ${theme && "theme-changer_theme_light"}`}
      ></button>
    </header>
  );
};

export default Header;
