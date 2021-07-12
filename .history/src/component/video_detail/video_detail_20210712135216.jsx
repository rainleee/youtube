import React from 'react';

const VideoDetail = (props) => {
    alert('Video' + props.id);
    return <h1 > props.id</h1>;
};

export default VideoDetail;