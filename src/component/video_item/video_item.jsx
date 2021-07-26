import React, { memo } from 'react';
import styles from './video_item.module.css';

const VideoItem = memo(({ video, video: { snippet }, onClickVideo, display }) => {
    const displayType = (display === 'list') ? styles.list : styles.grid;

    //Detail event
    const onClickVideoBox = () => {
        onClickVideo(video);
    }

    return (
        <li className={`${styles.container} ${displayType}`} onClick={onClickVideoBox} >
            <div className={styles.video}>
                <img className={styles.thumbnails} src={snippet.thumbnails.medium.url} alt={snippet.title} />
                <div className={styles.metadata}>
                    <p className={styles.title}>{snippet.title}</p>
                    <p className={styles.channel}>{snippet.channelTitle}</p>
                    {/* {viewCount} */}
                </div >
            </div>
        </li >
    );
});


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