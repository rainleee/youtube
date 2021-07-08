import React, { useEffect, useState } from 'react';
import VideoItem from '../video_item/video_item';

const VideoList = props => {
    // console.log(props);
    return (
        <ul>
            {props.videos.map(video => <VideoItem key={video.id} video={video} onVideoDetail={props.onVideoDetail} />)}
        </ul>);
};

export default VideoList;