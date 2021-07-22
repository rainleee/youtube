import React from 'react';
import VideoItem from '../video_item/video_item';
import style from './video_list.module.css';

const VideoList = ({ videos, onClickVideo }) => {

    return (
        <ul className={style.videos}>
            {videos.map(video => <VideoItem key={video.id} video={video} onClickVideo={onClickVideo} />)}
        </ul>
    )
};

export default VideoList;