import React from 'react';
import VideoItem from '../video_item/video_item';

const VideoList = ({ videos, onVideoDetail }) => {

    return (
        <ul>
            {videos.map(video => <VideoItem key={video.id} video={video} onVideoDetail={onVideoDetail} />)}
        </ul>
    )
};

export default VideoList;