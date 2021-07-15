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
        <li>
            <img src={snippet.thumbnails.medium.url} alt="video thumbnails" />
            <div className='video-detail' onClick={onVideoDetail}>
                <p>{snippet.title}</p>
                <p>{snippet.channelTitle}</p>
                {/* {viewCount} */}
            </div >
        </li>
    );
};


export default VideoItem;