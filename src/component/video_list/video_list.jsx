import React from "react";
import VideoItem from "../video_item/video_item";
import styles from "./video_list.module.css";

const VideoList = ({ videos, onClickVideo, display }) => {
  const displayType = display ? styles.one__row__grid : "";

  return (
    <ul className={`${styles.videos} ${displayType}`}>
      {videos.map(video => (
        <VideoItem
          key={video.id}
          video={video}
          onClickVideo={onClickVideo}
          display={display}
        />
      ))}
    </ul>
  );
};

export default VideoList;
