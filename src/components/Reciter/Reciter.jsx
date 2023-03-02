import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from "./Reciter.module.css";
import { playSpecificSurah, play } from "../../features/audioSlice";

const Reciter = ({ reciter, index, active }) => {
  const dispatch = useDispatch();

  const onTryHandler = (moshaf) => {
    dispatch(
      playSpecificSurah({
        reciterId: reciter.id,
        telawahId: moshaf.id,
        surahNumber: moshaf.surah_list[0],
      })
    );
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
              <div className={classes.try} >
                جرب
              </div>
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
          <div className={classes.name}>
            <h3>{reciter.name}</h3>
          </div>

          <div className={classes["details-wrapper"]}>
            {reciter.moshaf.map((moshaf, index) => (
              <div className={classes.details} key={moshaf.id}>
                <Link
                  to={`/surahs/${reciter.id}/${moshaf.id}`}
                  className={classes.telawah}
                >
                  {moshaf.name}
                </Link>
                <div
                  className={classes.try}
                  onClick={() => onTryHandler(moshaf, reciter.name, index)}
                >
                  جرب
                </div>
                <div className={classes["number-of-pages"]}>
                  {moshaf.surah_total === 114 ? "كاملة" : moshaf.surah_total}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Reciter;
