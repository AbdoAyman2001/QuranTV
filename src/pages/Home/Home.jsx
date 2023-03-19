import React, { useEffect } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import classes from "./Home.module.css";
import quran from "../../assets/vector.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className={classes.hero}>
        <div className={classes.container}>
          <div className={classes.details}>
            <h1 className={classes.title}>
              {" "}
              وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا
              <strong> لَعَلَّكُمْ تُرْحَمُونَ</strong>{" "}
            </h1>
            <h3 className={classes[`sub-title`]}>
              فَكُنْ مَع قَوَافِلِ المَرْحُومِينَ
            </h3>
            <div className={classes.action}>
              <button onClick={() => navigate("/reciters")}>
                قائمة القراء
              </button>
            </div>
          </div>
          <div className={classes.visuals}>
            <img src={quran} alt="quran vector" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
