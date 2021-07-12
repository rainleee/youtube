import React from 'react';

const VideoDetail = (props) => {
    console.log('dsds', props);
   return (<h1>{props.video.snippet.title}</h1> );
};

export default VideoDetail;