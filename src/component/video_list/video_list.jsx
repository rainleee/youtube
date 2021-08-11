import React from "react";
import VideoItem from "../video_item/video_item";
import styles from "./video_list.module.css";

const VideoList = ({ videos, onClickVideo, display }) => {
  //   const displayType =
  //     display === "videoPlayer" ? styles.videoPlayer : styles.grid;
  const displayType = display !== null ? styles.videoPlayer : styles.grid;

  return (
    <main className={styles.main}>
      {!display && (
        <div className={styles.title}>
          <h1>인기 급상승 동영상</h1>
        </div>
      )}
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
    </main>
  );
};

export default VideoList;
