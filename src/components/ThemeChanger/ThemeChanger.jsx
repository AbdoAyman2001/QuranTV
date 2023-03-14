import React, { useState, useEffect, useRef } from "react";
import classes from "./ThemeChanger.module.css";
import lightTheme from "../../themes/light-theme.module.css";
import darkTheme from "../../themes/dark-theme.module.css";

const ThemeChanger = () => {
  const currentTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(() => (currentTheme ? currentTheme : ""));
  const lightRadioRef = useRef();
  const darkRadioRef = useRef();
  const [themesShown, setThemesShown] = useState(false);

  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute("theme", theme);
  }, [theme]);

  const onChangeChoice = (e) => {
    switch (e.target) {
      case lightRadioRef.current:
        setTheme("light");
        localStorage.setItem("theme", "light");
        break;
      case darkRadioRef.current:
        localStorage.setItem("theme", "dark");
        setTheme("dark");
        break;
    }
  };

  const onToggleHandler = () => {
    setThemesShown((prev) => !prev);
  };

  return (
    <>
      <form
        className={`${classes.themes} ${themesShown ? classes.shown : ""}`}
        action=""
        onClick={onChangeChoice}
      >
        <fieldset>
          <legend
            className={classes["visually-hidden"]}
            onClick={onToggleHandler}
          >
            choose your theme
          </legend>
          <label htmlFor="light" className={classes["visually-hidden"]}>
            Light mode
          </label>
          <input
            ref={lightRadioRef}
            type="radio"
            name="theme"
            id="light"
            onChange={() => {}}
            className={classes.light}
            checked={theme === "light"}
          />
          <label htmlFor="dark" className={classes["visually-hidden"]}>
            Dark mode
          </label>
          <input
            ref={darkRadioRef}
            type="radio"
            name="theme"
            id="dark"
            onChange={() => {}}
            checked={theme === "dark"}
            className={classes.dark}
          />
        </fieldset>
      </form>
    </>
  );
};

export default ThemeChanger;
