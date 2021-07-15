import React from 'react';

const VideoItem = props => {
    // let viewCount = props.video.statistics.viewCount;

    // if (viewCount.length > 5) {
    //     viewCount = viewCount.split(viewCount.slice(-4))[0] + '만회';
    // }


    const onVideoDetail = () => {
        //id => 다른것으로 교체할 것.
        props.onVideoDetail(props.video);
    }

    return (
        <li>
        <div className='video-detail' onClick={onVideoDetail}>
            <img src={props.video.snippet.thumbnails.medium.url} alt="video thumbnails" />
            {props.video.snippet.title}
            {props.video.snippet.channelTitle}
            {/* {viewCount} */}
        </div >
        </li>
    );
};


export default VideoItem;