import Reciter from "../../components/Reciter/Reciter";
import NoResultFound from "../../components/UI/NoResultFound";
import classes from "./Reciters.module.css";
import React, { useState, useEffect } from "react";
import { useGetRecitersQuery } from "../../features/audioApi";
import Loading from "../../components/UI/Loading";
import { useSelector } from "react-redux";
import { useGetSurahsQuery } from "../../features/surahsApi";

const Reciters = () => {
  const { data, error, isLoading } = useGetRecitersQuery();
  const reciters = useSelector((state) => state.audio.reciters);

  const readingReciterName = useSelector(
    (state) => state.audio.playingSurah.reciterName
  );

  const [searchTerm, setSearchTerm] = useState("");
  let filteredReciters = reciters.filter((reciter) =>
    reciter.name.includes(searchTerm)
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let isCancelled = false;
    const debouncedFilter = () => {
      filteredReciters = reciters?.filter((reciter) =>
        reciter.name.includes(searchTerm)
      );
    };
    const debouncedFilterRAF = () => {
      requestAnimationFrame(debouncedFilter);
    };
    debouncedFilterRAF();
    return () => {
      isCancelled = true;
    };
  }, [searchTerm, reciters, filteredReciters]);

  return (
    <>
      <div className={classes.search}>
        <input
          type="text"
          placeholder="إبحث هنا عن القارئ"
          onChange={handleSearchChange}
        />
      </div>

      <div className={classes["home-wrapper"]}>
        <Reciter key={-1} index={-1} />
        {filteredReciters?.length > 0 &&
          !isLoading &&
          !error &&
          filteredReciters.map((reciter, index) => (
            <Reciter
              reciter={reciter}
              key={reciter.id}
              index={index}
              active={reciter.name === readingReciterName}
            />
          ))}
        {filteredReciters?.length === 0 && !error && !isLoading && (
          <NoResultFound />
        )}
        {isLoading && !error && <Loading />}
        {error && <h3>عذرا لقد حدث خطأ أثناء تحميل القراء</h3>}
      </div>
    </>
  );
};

export default Reciters;
