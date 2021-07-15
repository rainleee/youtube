import React from 'react';

const VideoItem = ({ video, onVideoDetail }) => {
    // let viewCount = video.statistics.viewCount;

    // if (viewCount.length > 5) {
    //     viewCount = viewCount.split(viewCount.slice(-4))[0] + '만회';
    // }


    const onVideoDetail = () => {
        //id => 다른것으로 교체할 것.
        onVideoDetail(video);
    }

    return (
        <li>
            <img src={video.snippet.thumbnails.medium.url} alt="video thumbnails" />
            <div className='video-detail' onClick={onVideoDetail}>
                <p>{video.snippet.title}</p>
                <p>{video.snippet.channelTitle}</p>
                {/* {viewCount} */}
            </div >
        </li>
    );
};


export default VideoItem;