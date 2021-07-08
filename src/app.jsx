import { useEffect, useState } from 'react';
import './app.css';
import Navbar from './component/navbar';
import VideoList from './component/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://youtube.googleapis.com/youtube/v3/videos?key=AIzaSyBWMiu8njc5xlVzUyY8wl7K5Xq-6hDxKsc&key=AIzaSyBWMiu8njc5xlVzUyY8wl7K5Xq-6hDxKsc&key=AIzaSyBWMiu8njc5xlVzUyY8wl7K5Xq-6hDxKsc&part=snippet&chart=mostPopular&maxResults=25&regionCode=KR&key=AIzaSyBWMiu8njc5xlVzUyY8wl7K5Xq-6hDxKsc", requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <>
      <Navbar />
      <VideoList videos={videos} />
    </>
  );
}

export default App;
