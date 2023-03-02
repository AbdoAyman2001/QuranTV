import React, { useState, useEffect, useRef } from "react";
import classes from "./ThemeChanger.module.css";
import lightTheme from "../../themes/light-theme.module.css";
import darkTheme from "../../themes/dark-theme.module.css";

const ThemeChanger = () => {
  const [theme, setTheme] = useState("light");
  const lightRadioRef = useRef();
  const darkRadioRef = useRef();

  useEffect(() => {
    document.body.setAttribute("theme", theme);
  }, [theme]);

  const onChangeChoice = (e) => {
    switch (e.target) {
      case lightRadioRef.current:
        setTheme("light");
        break;
      case darkRadioRef.current:
        setTheme("dark");
        break;
    }
  };

  return (
    <>
      <form className={classes.themes} action="" onClick={onChangeChoice}>
        <fieldset>
          <legend className={classes["visually-hidden"]} >
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
            checked={theme === "dark"}
            className={classes.dark}
          />
        </fieldset>
      </form>
    </>
  );
};

export default ThemeChanger;
