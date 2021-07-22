import { useEffect, useState } from 'react';
import styles from './app.module.css';
import CONFIG from './config.js';
import SearchHeader from './component/search_header/search_header';
import VideoDetail from './component/video_detail/video_detail';
import VideoList from './component/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectVideo, setSelectVideo] = useState(null);
  const [subcribCount, setSubcribCount] = useState(0);

  //Fav videos fetch
  const fetchReqFavVideos = (reqHttps, requestOptions) => {
    fetch(reqHttps, requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }

  //init or update 
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetchReqFavVideos(CONFIG.HTTPS_ADDR, requestOptions);
  }, []);

  //logo click event
  const handleMainPage = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    setSelectVideo(null);
    fetchReqFavVideos(CONFIG.HTTPS_ADDR, requestOptions);
  }

  //set state
  // const handleVideoDetail = video => setSelectVideo(video);
  const handleVideoDetail = video => {
    setSelectVideo(video);

    const reqHttps = `https://youtube.googleapis.com/youtube/v3/channels?key=${CONFIG.API_KEY}&part=statistics&id=${video.snippet.channelId}`;

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(reqHttps, requestOptions)
      .then(response => response.json())
      .then(result => setSubcribCount(result.items[0].statistics.subscriberCount))
      .catch(error => console.log('error', error));

  }

  //search videos
  const handleSearhVideos = query => {
    //search 조건 초기화
    setSelectVideo(null);

    const reqHttps = `https://youtube.googleapis.com/youtube/v3/search?key=${CONFIG.API_KEY}&type=video&part=snippet&maxResults=25&q=${query}&nextPageToken=CBkQAA`;

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(reqHttps, requestOptions)
      .then(response => response.json())
      .then(result =>
        result.items.map(item => ({ ...item, id: item.id.videoId }))
      )
      .then(items => setVideos(items))
      .catch(error => console.log('error', error));

  }

  return (
    <div className={styles.app}>
      <SearchHeader onSearchVideo={handleSearhVideos} onMainPage={handleMainPage} />
      {selectVideo && <VideoDetail video={selectVideo} subcribCount={subcribCount} />}
      <VideoList videos={videos} onClickVideo={handleVideoDetail} />
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