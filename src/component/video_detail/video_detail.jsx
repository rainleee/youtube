import React from "react";
import styles from "./video_detail.module.css";

const VideoDetail = ({
  video: { snippet },
  video: { id },
  video: { statistics },
  subcribCount,
}) => {
  // const viewCount = parseInt(statistics.viewCount).toLocaleString('ko-KR');
  const date = new Date(snippet.publishedAt);
  return (
    <section className={styles.detail}>
      <div className={styles.iframebox}>
        <iframe
          className={styles.videoPlayer}
          type="text/html"
          title="youtube video player"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <h2 className={styles.title}>{snippet.title}</h2>
      {/* <h2>조회수 {viewCount}회</h2> */}
      <h3 className={styles.uploadDate}>{date.toLocaleDateString()}</h3>
      {/* <h2>좋아요 {statistics.likeCount}</h2>
            <h2>싫어요 {statistics.dislikeCount}</h2> */}
      <h3 className={styles.channelTitle}>채널명 : {snippet.channelTitle}</h3>
      <h4 className={styles.subcribCount}>
        구독자 {parseInt(subcribCount).toLocaleString("ko-KR")}명
      </h4>
      <pre className={styles.description}>{snippet.description}</pre>
      {/* <h2>tags : {snippet.tags.map(tag => <span>#{tag} </span>)}</h2> */}
    </section>
  );
};

export default VideoDetail;
