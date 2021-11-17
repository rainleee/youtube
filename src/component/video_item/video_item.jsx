import React, { memo } from 'react';
import styles from './video_item.module.css';

const VideoItem = memo(
  ({ video, video: { snippet }, onClickVideo, display }) => {
    const displayType = display ? styles.item__flex : '';

    //Detail event
    const onClickVideoBox = () => {
      onClickVideo(video);
    };

    return (
      <li className={displayType} onClick={onClickVideoBox}>
        <div className={styles.thumbnails__box}>
          <img
            className={styles.thumbnails}
            src={snippet.thumbnails.medium.url}
            alt={snippet.title}
          />
        </div>
        <div className={styles.metadata}>
          <h1 className={styles.title}>{snippet.title}</h1>
          <p className={styles.channel}>{snippet.channelTitle}</p>
          {/* {viewCount} */}
        </div>
        {/* </div> */}
      </li>
    );
  }
);

export default VideoItem;
