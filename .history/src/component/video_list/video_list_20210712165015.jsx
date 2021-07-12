import React, { useEffect, useState } from 'react';
import VideoItem from '../video_item/video_item';

const VideoList = ({videos, onVideoDetail}) => (
        <ul>
            {videos.map(video => <VideoItem key={video.id} video={video} onVideoDetail={onVideoDetail} />)}
        </ul>;
);

export default VideoList;