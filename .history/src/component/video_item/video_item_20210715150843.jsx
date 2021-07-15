import React from 'react';

const VideoItem = ({ video, onVideoDetail }) => {
    // let viewCount = props.video.statistics.viewCount;

    // if (viewCount.length > 5) {
    //     viewCount = viewCount.split(viewCount.slice(-4))[0] + '만회';
    // }


    const onVideoDetailView = () => {
        //id => 다른것으로 교체할 것.
        onVideoDetail(video);
    }

    return (
        <li>
            <img src={video.snippet.thumbnails.medium.url} alt="video thumbnails" />
            <div className='video-detail' onClick={onVideoDetailView}>
                <p>{video.snippet.title}</p>
                <p>{video.snippet.channelTitle}</p>
                {/* {viewCount} */}
            </div >
        </li>
    );
};


export default VideoItem;