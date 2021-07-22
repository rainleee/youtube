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
    setSelectVideo(null);
    fetchReqFavVideos(CONFIG.HTTPS_ADDR, requestOptions);
  }

  //set state
  const handleVideoDetail = video => setSelectVideo(video);

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
      {selectVideo && <VideoDetail video={selectVideo} />}
      <VideoList videos={videos} onClickVideo={handleVideoDetail} />
    </div>
  );
}

export default App;