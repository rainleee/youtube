import React, { memo } from "react";
import styles from "./video_item.module.css";

const VideoItem = memo(
  ({ video, video: { snippet }, onClickVideo, display }) => {
    // const displayType =
    //   display === "videoPlayer" ? styles.videoPlayer : styles.grid;

    const displayType = display !== null ? styles.flex : styles.grid;

    console.log("displayType");
    console.log(displayType);

    //Detail event
    const onClickVideoBox = () => {
      onClickVideo(video);
    };

    return (
      <li
        className={`${styles.container} ${displayType}`}
        onClick={onClickVideoBox}
      >
        <div className={styles.video}>
          <img
            className={styles.thumbnails}
            src={snippet.thumbnails.medium.url}
            alt={snippet.title}
          />
          <div className={styles.metadata}>
            <h3 className={styles.title}>{snippet.title}</h3>
            <p className={styles.channel}>{snippet.channelTitle}</p>
            {/* {viewCount} */}
          </div>
        </div>
      </li>
    );
  }
);

export default VideoItem;

/*
const onClickVideoBox = () => {
    onClickVideo(snippet);
}

return (
    <li className={styles.container} onClick={onClickVideoBox}>
        <div className={styles.video}>
            <img className={styles.thumbnails} src={snippet.thumbnails.medium.url} alt={snippet.title} />
            <div className={styles.metadata}>
                <p className={styles.title}>{snippet.title}</p>
                <p className={styles.channel}>{snippet.channelTitle}</p>
            </div >
        </div>
    </li>
) */
