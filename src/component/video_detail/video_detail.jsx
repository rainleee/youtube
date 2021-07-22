import React, { useState } from 'react';
import styles from './video_detail.module.css';

const VideoDetail = ({ video, video: { snippet }, video: { id }, video: { statistics }, subcribCount }) => {
    // const viewCount = parseInt(statistics.viewCount).toLocaleString('ko-KR');
    const date = new Date(snippet.publishedAt);
    return (
        <div>
            <iframe src={`https://www.youtube.com/embed/${id}`} type="text/html" width="1000" height="500" frameborder="0"></iframe>
            <h1>{snippet.title}</h1>
            {/* <h2>조회수 {viewCount}회</h2> */}
            <h2>{date.toLocaleDateString()}</h2>
            {/* <h2>좋아요 {statistics.likeCount}</h2>
            <h2>싫어요 {statistics.dislikeCount}</h2> */}
            <h2>{snippet.channelTitle}</h2>
            <h2>{snippet.description}</h2>
            <h2>구독자 {parseInt(subcribCount).toLocaleString('ko-KR')}명</h2>
            {/* <h2>tags : {snippet.tags.map(tag => <span>#{tag} </span>)}</h2> */}
        </div>
    )
};

export default VideoDetail;