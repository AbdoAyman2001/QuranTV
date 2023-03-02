import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Progress.module.css";

const Progress = ({ current, end, onSeek, type }) => {
  const [BubbleX, setBubbleX] = useState(0); // bubbleX is width in px
  const progressBarRef = useRef();

  const secs2mins = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = (seconds % 60).toFixed(0);
    const formattedRemainingSeconds =
      remainingSecs < 9 ? `0${remainingSecs}` : remainingSecs;
    if (mins < 60) return `${mins}:${formattedRemainingSeconds}`;
    const hours = Math.floor(mins / 60);
    const remainingMins = (mins % 60).toFixed(0);
    const formattedHours = hours < 9 ? `0${hours}` : hours;
    const formattedRemainingMins =
      remainingMins < 9 ? `0${remainingMins}` : remainingMins;
    return `${formattedHours}:${formattedRemainingMins}:${formattedRemainingSeconds}`;
  };

  useEffect(() => {
    if (!isNaN(current / end)) {
      if (type === "audio") {
        setBubbleX((current / end) * progressBarRef.current.offsetWidth);
      } else if (type === "volume") {
        setBubbleX((current / end) * progressBarRef.current.offsetHeight);
      }
    }
  }, [
    current,
    end,
    progressBarRef?.current?.offsetHeight,
    progressBarRef?.current?.offsetWidth,
  ]);

  const handleMouseDown = (e) => {
    // console.log("down");
    if (type === "audio") {
      setBubbleX(
        progressBarRef.current.getBoundingClientRect().right - e.clientX
      );
    } else if (
      type === "volume" &&
      progressBarRef.current.getBoundingClientRect().bottom - e.clientY <
        progressBarRef.current.getBoundingClientRect().height
    ) {
      setBubbleX(
        progressBarRef.current.getBoundingClientRect().bottom - e.clientY
      );
    }
  };
  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      if (type === "audio") {
        setBubbleX(
          progressBarRef.current.getBoundingClientRect().right - e.clientX
        );
      } else if (
        type === "volume" &&
        progressBarRef.current.getBoundingClientRect().bottom - e.clientY <=
          progressBarRef.current.getBoundingClientRect().height
      ) {
        setBubbleX(
          progressBarRef.current.getBoundingClientRect().bottom - e.clientY
        );
      }
    }
  };
  const handleMouseUp = () => {
    // console.log("up");
    if (type === "audio") {
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const newTime = (BubbleX / progressBarRect.width) * end;
      onSeek(newTime); // time in seconds
    } else if (type === "volume") {
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const newAudioLevel = BubbleX / progressBarRect.height;
      console.log(newAudioLevel);
      onSeek(newAudioLevel);
    }
  };
  return (
    <div className={`${classes["progress-container"]} ${classes[type]}`}>
      <div className={classes.current}>
        {type === "audio" && !isNaN(current) && secs2mins(Math.floor(current))}
        {type === "volume" &&
          (
            (BubbleX /
              progressBarRef?.current?.getBoundingClientRect().height) *
            100
          ).toFixed(0)}
      </div>
      <div
        className={classes.progress}
        style={{ "--percentage": `${BubbleX.toFixed(0)}px` }}
        onMouseMoveCapture={handleMouseMove}
        onMouseDownCapture={handleMouseDown}
        onMouseUpCapture={handleMouseUp}
        ref={progressBarRef}
      >
        <div className={classes["whole-bar"]}></div>
        <div className={classes.controller}></div>
        <div className={classes["active-part"]}></div>
      </div>
      <div className={classes.total}>
        {type === "audio" && !isNaN(end) && secs2mins(Math.floor(end))}
        {type === "volume" && end}
      </div>
    </div>
  );
};

export default Progress;
