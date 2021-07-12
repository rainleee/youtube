import React from 'react';

const VideoItem = props => {
    let viewCount = props.video.statistics.viewCount;
    
    if (viewCount.length > 5) {
        viewCount = viewCount.split(viewCount.slice(-4))[0] + '만회';
    }
    

    const onVideoDetail = () => {
        props.onVideoDetail(props.video.id);
    }

    return (
        <div className='video-detail' onClick={onVideoDetail}>
            <img src={props.video.snippet.thumbnails.medium.url} alt="" />
            {props.video.snippet.title}
            {props.video.snippet.channelTitle}
            {/* {viewCount} */}
        </div >
    );
};


export default VideoItem;