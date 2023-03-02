import Reciter from "../../components/Reciter/Reciter";
import NoResultFound from "../../components/UI/NoResultFound";
import classes from "./Home.module.css";
import React, { useState, useEffect } from "react";
import { useGetRecitersQuery } from "../../features/audioApi";
import Loading from "../../components/UI/Loading";
import { useSelector } from "react-redux";
import { useGetSurahsQuery } from "../../features/surahsApi";

const Home = () => {
  const { data, error, isLoading } = useGetRecitersQuery();
  // useGetSurahsQuery();
  const readingReciterName = useSelector(
    (state) => state.audio.playingSurah.reciterName
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReciters, setFilteredReciters] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let isCancelled = false;
    const debouncedFilter = () => {
      setFilteredReciters(() => {
        return data?.filter((reciter) => reciter.name.includes(searchTerm));
      });
    };
    const debouncedFilterRAF = () => {
      requestAnimationFrame(debouncedFilter);
    };
    debouncedFilterRAF();
    return () => {
      isCancelled = true;
    };
  }, [searchTerm, data]);

  return (
    <>
      <div className={classes.search}>
        <input
          type="text"
          placeholder="إبحث هنا"
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

export default Home;
