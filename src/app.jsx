import { useEffect, useState } from 'react';
import styles from './app.module.css';
import CONFIG from './config.js';
import SearchHeader from './component/search_header/search_header';
import VideoDetail from './component/video_detail/video_detail';
import VideoList from './component/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectVideo, setSelectVideo] = useState(null);

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

    fetchReqFavVideos(CONFIG.HTTPS_ADDR, requestOptions);
  }


  const handleVideoDetail = video => {
    setSelectVideo(video);
  }

  //search videos
  const handleSearhVideos = query => {
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
      .catch(error => console.log('error', error))
  }

  return (
    <div className={styles.app}>
      <SearchHeader onSearchVideo={handleSearhVideos} onMainPage={handleMainPage} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;


/*
  해야할 것 목록
  1. fetch이벤트를 효율적으로 처리하지 못하고 계속 이벤트가 생성될떄마다 부르는 것
  2.reqHttps를 useState로 할 시 디펜던시 관련 에러가 나와서 변수로 처리중인데 그부분을 고칠것

*/