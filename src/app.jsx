import { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './component/search_header/search_header';
import VideoDetail from './component/video_detail/video_detail';
import VideoList from './component/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectVideo, setSelectVideo] = useState(null);
  const [subcribCount, setSubcribCount] = useState(0);

  //init or update 
  useEffect(() => {
    youtube.mostPopular()
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, [youtube]);

  //logo click
  const handleMainPage = useCallback(async () => {
    setSelectVideo(null);

    const result = await youtube.mostPopular()
      .catch(error => console.log('error', error));

    setVideos(result.items);
  }, [youtube]);

  //go to Play video
  const handleVideoDetail = async video => {
    setSelectVideo(video);

    const result = await youtube.subscriberCount(video.snippet.channelId)
      .catch(error => console.log('error', error));

    const subscriberCount = result.items[0].statistics.subscriberCount;

    setSubcribCount(subscriberCount);
  }

  //search videos
  const handleSearhVideos = useCallback(async query => {
    setVideos(
      await youtube.searchVideo(query)
        .catch(error => console.log('error', error))
    );

    setSelectVideo(null);
  }, [youtube]);

  return (
    <div className={styles.app}>
      {/* <SearchHeader onSearchVideo={handleSearhVideos} /> */}
      <SearchHeader onSearchVideo={handleSearhVideos} onMainPage={handleMainPage} />
      <section className={styles.content}>
        {selectVideo &&
          <div className={styles.detail}>
            <VideoDetail video={selectVideo} subcribCount={subcribCount} />
          </div>
        }
        <div className={styles.list}>
          <VideoList videos={videos} onClickVideo={handleVideoDetail} display={selectVideo ? 'list' : 'grid'} />
        </div>
      </section>
    </div>
  );
}

export default App;

/*
  유투브 클론코딩을 하고 자동화 할 곳을 찾아보기.

  리팩토링 하되 처음부터 뜯어서 할 생각을 하지말고, 새로운 기능에 해당 기술을 사용해서 적용해보기

  fetch와 ajax같은 자바스크립트 비동기통신기술? 사용 비교하기 fatch에 대해 공부하기

  웹브라우저 통신기술에 대해 공부하기

  test 코드를 만들어서 활용하는 방법으로 구현하기!!!!

  세션,쿠키, 로컬스토리지를 이용한 정보 남겨두기 구현해보기
*/

/*
  오늘 할 일
  1. fetch 통신을 하는 컴포넌트가 겹쳐져있기 때문에 그부분을 별도로 구성한다.
  2.TODO List 익스텐션 깔기
*/