import { useEffect, useState } from 'react';
import styles from './app.module.css';
import CONFIG from './config.js';
import SearchHeader from './component/search_header/search_header';
import VideoDetail from './component/video_detail/video_detail';
import VideoList from './component/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectVideo, setSelectVideo] = useState(null);
  let reqHttps = `https://youtube.googleapis.com/youtube/v3/videos?key=${CONFIG.API_KEY}&part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR`;

  const handleVideoDetail = video => {
    setSelectVideo(video);
  }

  //search videos
  const handleSearhVideos = query => {
    reqHttps = `https://youtube.googleapis.com/youtube/v3/search?key=${CONFIG.API_KEY}&type=video&part=snippet&maxResults=25&q=${query}&nextPageToken=CBkQAA`;

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

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(reqHttps, requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearchVideo={handleSearhVideos} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;