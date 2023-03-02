import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Surah.module.css";
import medina from "../../assets/medina.png";
import kaaba from "../../assets/kaaba.png";
import { playSpecificSurah } from "../../features/audioSlice";
import { useParams } from "react-router-dom";

const Surah = ({ surah, reciter, moshaf }) => {
  const [active, setActive] = useState(false);
  const surahs = useSelector((state) => state.audio.surahs);
  const dispatch = useDispatch();
  const params = useParams();
  const surahNumber = +Object.keys(surah)[0];
  const foundSurah = surahs.find((surah) => surah.number === surahNumber);
  const revelationType =
    foundSurah.revelationType === "Meccan" ? "مكية" : "مدنية";
  const { reciterName, surahName, recitation } = useSelector(
    (state) => state.audio.playingSurah
  );

  useEffect(() => {
    setActive(
      foundSurah.name === surahName &&
        reciter.name === reciterName &&
        recitation === moshaf.name
    );
  }, [surahName, reciterName, recitation]);

  const playSurahHandler = () => {
    dispatch(
      playSpecificSurah({
        reciterId: params.reciterId,
        telawahId: params.moshafId,
        surahNumber: surahNumber,
      })
    );
  };

  return (
    <div
      className={`${classes["surah-container"]} ${
        active ? classes.active : ""
      }`}
      onClick={playSurahHandler}
    >
      <p className={classes.order}>{surahNumber}</p>
      <h3 className={classes["surah-name"]}>{foundSurah.name}</h3>
      <p className={classes["number-of-verses"]}>{foundSurah.numberOfAyahs}</p>
      <div className={classes["revelation"]}>
        <img
          alt={revelationType}
          src={revelationType === "مكية" ? kaaba : medina}
        ></img>
      </div>
    </div>
  );
};
export default Surah;
