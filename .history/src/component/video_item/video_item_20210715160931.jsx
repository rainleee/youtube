import React from 'react';
import styles from './video_item.module.css';

const VideoItem = ({ video: { snippet }, onVideoDetail: onVideoDetailView }) => {
    // let viewCount = props.video.statistics.viewCount;

    // if (viewCount.length > 5) {
    //     viewCount = viewCount.split(viewCount.slice(-4))[0] + '만회';
    // }


    const onVideoDetail = () => {
        //id => 다른것으로 교체할 것.
        // onVideoDetailView(video);
    }

    return (
        <li className={styles.container}>
            <div className={styles.video}>
                <img className={styles.thumbnails} src={snippet.thumbnails.medium.url} alt="video thumbnails" />
                <div className={styles.metadate} onClick={onVideoDetail}>
                    <p className={styles.title}>{snippet.title}</p>
                    <p className={styles.channel}>{snippet.channelTitle}</p>
                    {/* {viewCount} */}
                </div >
            </div>
        </li>
    );
};


export default VideoItem;