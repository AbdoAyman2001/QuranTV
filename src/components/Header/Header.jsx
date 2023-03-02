import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ThemeChanger from "../ThemeChanger/ThemeChanger";

const Header = () => {
  const icon = useRef();
  const linksWrapper = useRef();

  const [isListShown, SetIsListShown] = useState(false);
  
  useEffect(() => {
    const menuBars = document.querySelectorAll(`.${classes.bar}`);
    const listener = (e) => {
      if (!(e.target === icon.current || [...menuBars].includes(e.target))) {
        SetIsListShown(false);
      }
    };

    document.documentElement.addEventListener("click", listener);
    return () => {
      document.documentElement.removeEventListener("click", listener);
    };
  }, []);

  const activateBarHandler = () => {
    SetIsListShown((prev) => !prev);
  };
  const closeListHandler = () => {
    SetIsListShown(false);
  };

  return (
    <header>
      <nav className={classes.nav}>
        <div className={classes.logo}>QuranTv</div>
        <div
          ref={icon}
          className={`${classes.icon} ${isListShown ? classes.active : ""}`}
          onClick={activateBarHandler}
        >
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
        </div>
        <div
          className={`${classes["links-wrapper"]} ${
            !isListShown ? classes.hidden : ""
          }`}
          ref={linksWrapper}
          onClick={closeListHandler}
        >
          <ul className={classes.links}>
            <li className={classes.link}>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                الرئيسية
              </NavLink>
            </li>
            <li className={classes.link}>
              <NavLink
                to={"/surahs"}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                السور
              </NavLink>
            </li>
            <li className={classes.link}>
              <NavLink
                to={"/playlists"}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                قوائم التشغيل
              </NavLink>
            </li>
            <li className={classes.link}>
              <NavLink
                to={"/settings"}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                الإعدادات
              </NavLink>
            </li>
          </ul>
          <ul className={classes.auth}>
            <li className={classes.link}>
              <NavLink
                to={"/signUp"}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                &nbsp;التسجيل&nbsp;
              </NavLink>
            </li>
            <li className={classes.link}>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                &nbsp;الدخول&nbsp;
              </NavLink>
            </li>
          </ul>
        </div>
        <ThemeChanger/>
      </nav>
    </header>
  );
};

export default Header;

//State updates from the useState() and useReducer() Hooks don't support the " +
// 'second callback argument. To execute a side effect after ' +
// 'rendering, declare it in the component body with useEffect().'
