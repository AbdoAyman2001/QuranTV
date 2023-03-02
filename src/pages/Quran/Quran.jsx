import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Surah from "../../components/Surah/Surah";
import { useGetRecitersQuery } from "../../features/audioApi";
import { useGetSurahsQuery } from "../../features/surahsApi";
import classes from "./Quran.module.css";

const Quran = () => {
  useGetRecitersQuery();
  // useGetSurahsQuery();
  const reciters = useSelector((state) => state.audio.reciters);
  const { moshafId, reciterId } = useParams();
  const [reciter, setReciter] = useState();
  const [moshaf, setMoshaf] = useState();

  useEffect(() => {
    if (reciters.length > 0) {
      const foundReciter = reciters.find(
        (reciter) => reciter.id === +reciterId
      );
      setReciter(foundReciter);
      setMoshaf(foundReciter.moshaf.find((moshaf) => moshaf.id === +moshafId));
    }
  }, [reciters]);

  return (
    <>
      {reciter && (
        <>
          <h2 className={classes["reciter-name"]}>{reciter.name}</h2>
          <h2 className={classes.rewayah}>{moshaf.name}</h2>
          <div className={classes["surahs-container"]}>
            {moshaf.surah_src.map((surah) => (
              <Surah
                surah={surah}
                reciter={reciter}
                moshaf={moshaf}
                key={Object.keys(surah)[0]}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Quran;
