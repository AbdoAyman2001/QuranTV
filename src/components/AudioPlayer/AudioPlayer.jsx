import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playDirectionalReciter,
  playDirectionalSurah,
} from "../../features/audioSlice";
import classes from "./AudioPlayer.module.css";
import Progress from "./Progress/Progress";
import { useLocation } from "react-router-dom";

const AudioPlayer = () => {
  const audioContainerRef = useRef();
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const { src, reciterName, surahName, recitation } = useSelector(
    (state) => state.audio.playingSurah
  );
  const [rerender, setRerender] = useState(0);
  const [controlsDisabled, setControlsDisabled] = useState(true);
  const main = document.querySelector("main");
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onPlayNext = () => {
    if (pathname === "/")
      dispatch(playDirectionalReciter({ direction: "next" }));
    else if (pathname.startsWith("/surah"))
      dispatch(playDirectionalSurah({ direction: "next" }));
  };
  const onPlayPrevious = () => {
    if (pathname === "/")
      dispatch(playDirectionalReciter({ direction: "previous" }));
    else if (pathname.startsWith("/surah"))
      dispatch(playDirectionalSurah({ direction: "previous" }));
  };

  useEffect(() => {
    if (src) {
      const containerHeight = audioContainerRef?.current
        ? audioContainerRef.current.offsetHeight
        : undefined;
      if (containerHeight && main)
        main.style["marginBlockEnd"] = `${containerHeight + 20}px`;
      audioContainerRef.current.style.display = "flex";
    } else {
      audioContainerRef.current.style.display = "none";
    }
  }, [src, rerender]);

  useEffect(() => {
    audioRef.current.currentTime = 0;
    setControlsDisabled(false);
    setPlaying(false);
    if (src) {
      setControlsDisabled(true);
      setPlaying(true);
    }
  }, [src]);

  const handleToggleAudio = () => {
    setPlaying((prev) => !prev);
  };

  const onProgressSeek = (Time) => {
    if (audioRef?.current) audioRef.current.currentTime = Time;
  };

  const onAudioLevelSeek = (audio) => {
    if (audioRef?.current) {
      audioRef.current.volume = audio.toFixed(2);
    }
  };

  useEffect(() => {
    const listener = () => {
      audioRef.current.currentTime = 0;
      setPlaying(false);
      if (pathname === "/") {
        dispatch(playDirectionalReciter({ direction: "next" }));
        // console.log("home");
      } else if(pathname.startsWith("/surahs")){
        dispatch(playDirectionalSurah({ direction: "next" }));
        // console.log("surahs");
      }
    };
    if (audioRef?.current) audioRef.current.addEventListener("ended", listener);
    
    return () => {
      if (audioRef.current)
        audioRef?.current.removeEventListener("ended", listener);
    };
  }, [audioRef?.current?.ended,pathname]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing, src]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && !audioRef.current.ended) {
        setRerender((prev) => prev + 1);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [playing]);

  return (
    <>
      <div ref={audioContainerRef} className={classes["audio-container"]}>
        <audio id="audioPlayback" ref={audioRef} src={src ? src : ""}></audio>
        <div className={classes["audio-controls"]}>
          <button disabled={!controlsDisabled} onClick={onPlayNext}>
            <span className="material-symbols-outlined">skip_next</span>
          </button>
          <button onClick={handleToggleAudio} disabled={!controlsDisabled}>
            {playing ? (
              <span className="material-symbols-outlined">pause</span>
            ) : (
              <span className="material-symbols-outlined">resume</span>
            )}
          </button>
          <button disabled={!controlsDisabled} onClick={onPlayPrevious}>
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
        </div>
        <Progress
          type={"audio"}
          current={
            audioRef?.current?.currentTime ? audioRef.current.currentTime : 0
          }
          end={audioRef?.current?.duration ? audioRef.current.duration : 0}
          onSeek={onProgressSeek}
        />
        <div className={classes.volIcon}>
          {audioRef?.current?.volume > 0.5 && (
            <span className="material-symbols-outlined">volume_up</span>
          )}
          {audioRef?.current?.volume <= 0.5 &&
            audioRef?.current?.volume >= 0.01 && (
              <span className="material-symbols-outlined">volume_down_alt</span>
            )}
          {audioRef?.current?.volume < 0.01 && (
            <span className="material-symbols-outlined">volume_off</span>
          )}
          <div className={classes.volume}>
            <Progress
              type={"volume"}
              current={
                audioRef?.current?.volume ? audioRef.current.volume * 100 : 0
              }
              end={100}
              onSeek={onAudioLevelSeek}
            />
          </div>
        </div>

        <div className={classes.reciter}>
          <div className={classes.name}>{reciterName}</div>
          <div className={classes.recitation}>{recitation}</div>
          <div className={classes.surah}>{surahName}</div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
