import React from "react";
import VideoItem from "../video_item/video_item";
import styles from "./video_list.module.css";

const VideoList = ({ videos, onClickVideo, display, searchKeyword }) => {
  const displayType = display !== null ? styles.videoPlayer : "";

  return (
    <ul className={`${styles.videos} ${displayType}`}>
      {videos.map(video => (
        <VideoItem
          key={video.id}
          video={video}
          onClickVideo={onClickVideo}
          display={display}
          searchKeyword={searchKeyword}
        />
      ))}
    </ul>
  );
};

export default VideoList;
