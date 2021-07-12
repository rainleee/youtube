import { useEffect, useState } from 'react';
import './app.css';
import Navbar from './component/navbar';
import VideoDetail from './component/video_detail/video_detail';
import VideoList from './component/video_list/video_list';
import './config';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=${config.API_KEY}&part=snippet&chart=mostPopular&maxResults=25&regionCode=KR`, requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);

  const handleVideoDetail = (id) => {
    alert(`app.jsx ${id}`);
    return <VideoDetail id={id} />;
  }



  return (
    <>
      <Navbar />
      <VideoList videos={videos} onVideoDetail={handleVideoDetail} />
    </>
  );
}

export default App;
