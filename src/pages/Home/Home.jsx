import React, { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  //////////////////////// Temp code ////////////////
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/reciters");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  /////////////////////////////////////////

  return (
    <>
      {/* <section className={classes.hero}>
        <div className={classes.details}>
          <h1 className={classes.title}></h1>
          <h3 className={classes[`sub-title`]}></h3>
          <div className={classes.action}></div>
        </div>

      </section> */}
    </>
  );
};

export default Home;
