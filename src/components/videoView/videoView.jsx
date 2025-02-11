import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BigVideo from "./bigVideo";
import VideoTitle from "./videoTitle";
import css from "./videoView.module.css";
import withFirebaseCollection from "../HOK/withFirebaseCollection";

const VideoView = ({ windowDimensions, data }) => {
  const location = useLocation();

  // Використання useEffect для прокручування сторінки вгору при зміні маршруту
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <VideoTitle windowDimensions={windowDimensions} />
      <BigVideo windowDimensions={windowDimensions} data={data} />
    </div>
  );
};

export default withFirebaseCollection("videoV")(VideoView);
