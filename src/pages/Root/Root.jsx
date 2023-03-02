import React from "react";
import { Outlet } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Header from "../../components/Header/Header";
import classes from "./Root.module.css";
const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet></Outlet>
      </main>
      <AudioPlayer />
    </>
  );
};

export default Root;
