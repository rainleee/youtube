import React from 'react';

const VideoItem = ({ video: { snippet: video }, onVideoDetail: onVideoDetailView }) => {
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
            <img src={video.thumbnails.medium.url} alt="video thumbnails" />
            <div className='video-detail' onClick={onVideoDetail}>
                <p>{video.title}</p>
                <p>{video.channelTitle}</p>
                {/* {viewCount} */}
            </div >
        </li>
    );
};


export default VideoItem;