import BigVideo from "./bigVideo";
import VideoTitle from "./videoTitle";
import css from "./videoView.module.css";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
const VideoView = ({ windowDimensions, data }) => {
  return (
    <div>
      <VideoTitle windowDimensions={windowDimensions} />
      <BigVideo windowDimensions={windowDimensions} data={data} />
    </div>
  );
};
export default withFirebaseCollection("videoV")(VideoView);
