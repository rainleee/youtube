import { useEffect, useState } from 'react';
import './app.css';
import config from './config.js';
import Navbar from './component/video_search/navbar';
import VideoDetail from './component/video_detail/video_detail';
import VideoList from './component/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectVideo, setSelectVideo] = useState(null);
  const [searchVideo, setSearchVideos] = useState(null);
  let reqHttps = `https://youtube.googleapis.com/youtube/v3/videos?key=${config.API_KEY}&part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR`;

  const handleVideoDetail = video => {
    setSelectVideo(video);
  }

  //search videos
  const handleSearhVideos = searchVal => {
    reqHttps = `https://youtube.googleapis.com/youtube/v3/search?key=${config.API_KEY}&part=snippet&maxResult=3&q=${searchVal}&nextPageToken=CBkQAA`;

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(reqHttps, requestOptions)
      .then(response => response.json())
      .then(result => setSearchVideos(result.items))
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
    <>
      <Navbar onSearchVideo={handleSearhVideos} />
      {selectVideo && <VideoDetail video={selectVideo} />}
      {searchVideo && <VideoList videos={searchVideo} onVideoDetail={handleVideoDetail} />}
      {!searchVideo && <VideoList videos={videos} onVideoDetail={handleVideoDetail} />}

    </>
  );
}

export default App;


/*
useEffect(searchVal => {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${config.API_KEY}&part=snippet&maxResult=25&q=${searchVal}&nextPageToken=CBkQAA`, requestOptions)
                .then(response => response.json())
                .then(result => setVideos(result.items))
                .catch(error => console.log('error', error))
        });

*/