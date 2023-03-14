import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from "./Reciter.module.css";
import {
  playSpecificSurah,
  addReciterToFavourite,
  removeReciterFromFavourite,
} from "../../features/audioSlice";
import { useEffect, useState } from "react";

const Reciter = ({ reciter, index, active }) => {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reciter) {
      setIsFav(Boolean(localStorage.getItem(reciter.id)));
    }
  }, [reciter]);

  const onTryHandler = (moshaf) => {
    dispatch(
      playSpecificSurah({
        reciterId: reciter.id,
        telawahId: moshaf.id,
        surahNumber: moshaf.surah_list[0],
      })
    );
  };

  const toggleFav = () => {
    reciter.isFav
      ? dispatch(removeReciterFromFavourite({ reciterId: reciter.id }))
      : dispatch(addReciterToFavourite({ reciterId: reciter.id }));
  };

  return (
    <>
      {index === -1 && (
        <div className={`${classes["reciter-container"]}`}>
          <div className={classes.name}>
            <h3>اسم القارئ</h3>
          </div>

          <div className={classes["details-wrapper"]}>
            <div className={classes.details}>
              <h3 className={classes.telawah}>التلاوة المتاحة</h3>
              <div className={classes.try}>جرب</div>
              <div className={classes["number-of-pages"]}>عدد السور</div>
            </div>
          </div>
        </div>
      )}

      {index >= 0 && (
        <div
          className={`${classes["reciter-container"]} ${
            active ? classes.active : ""
          }`}
        >
          <div className={`${classes.favourite}`} onClick={toggleFav}>
            {reciter.isFav ? (
              <span className="material-icons">star</span>
            ) : (
              <span className="material-icons">star_outlined</span>
            )}
          </div>

          <div className={classes.name}>
            <h3>{reciter.name}</h3>
          </div>

          <div className={classes["details-wrapper"]}>
            {reciter.moshaf.map((moshaf, index) => (
              <div className={classes.details} key={moshaf.id}>
                <div className={classes.telawah}>{moshaf.name}</div>
                <div
                  className={classes.try}
                  onClick={() => onTryHandler(moshaf, reciter.name, index)}
                >
                  جرب
                </div>
                <Link
                  className={classes["number-of-pages"]}
                  to={`/reciters/${reciter.id}/${moshaf.id}`}
                >
                  استمع
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Reciter;
