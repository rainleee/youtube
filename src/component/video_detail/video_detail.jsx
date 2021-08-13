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
    <div className={styles.container}>
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
      <div className={styles.info}>
        <h1 className={styles.title}>{snippet.title}</h1>
        <h3 className={styles.upload__date}>
          게시일: {date.toLocaleDateString()}
        </h3>
        <div className={styles.channel__info}>
          <h2 className={styles.channel__title}>{snippet.channelTitle}</h2>
          <h3 className={styles.subcrib__count}>
            구독자 {parseInt(subcribCount).toLocaleString("ko-KR")}명
          </h3>
        </div>
        <pre className={styles.description}>{snippet.description}</pre>
        {/*   search API 호출 시 해당 데이터를 불러올 수 없어 보류  
        <h2>좋아요 {statistics.likeCount}</h2>
            <h2>싫어요 {statistics.dislikeCount}</h2> */}
        {/* <h2>조회수 {viewCount}회</h2> */}
        {/* <h2>tags : {snippet.tags.map(tag => <span>#{tag} </span>)}</h2> */}
      </div>
    </div>
  );
};

export default VideoDetail;
