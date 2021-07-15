import React from 'react';
import VideoItem from '../video_item/video_item';
import style from './video_list.module.css';

const VideoList = ({ videos, onVideoDetail }) => {

    return (
        <ul className={style.video}>
            {videos.map(video => <VideoItem key={video.id} video={video} onVideoDetail={onVideoDetail} />)}
        </ul>
    )
};

export default VideoList;