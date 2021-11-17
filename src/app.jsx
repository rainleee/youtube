import { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './component/search_header/search_header';
import VideoDetail from './component/video_detail/video_detail';
import VideoList from './component/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectVideo, setSelectVideo] = useState(null);
  const [subcribCount, setSubcribCount] = useState(0);
  const [display, setDisplay] = useState(null);

  //init or update
  useEffect(() => {
    youtube
      .mostPopular()
      .then(resultItems => setVideos(resultItems))
      .catch(error => console.log('error', error));
  }, [youtube]);

  //logo click
  const handleMainPage = useCallback(async () => {
    setDisplay(null);
    setSelectVideo(null);

    const result = await youtube
      .mostPopular()
      .catch(error => console.log('error', error));

    setVideos(result);
  }, [youtube]);

  //go to video Player
  const handleVideoDetail = async video => {
    window.scrollTo(0, 0);
    setSelectVideo(video);
    setDisplay('detail');

    const subscriberCount = await youtube
      .subscriberCount(video.snippet.channelId)
      .catch(error => console.log('error', error));
    setSubcribCount(subscriberCount);
  };

  //search videos
  const handleSearhVideos = useCallback(
    async query => {
      setVideos(
        await youtube
          .searchVideo(query)
          .catch(error => console.log('error', error))
      );

      setSelectVideo(null);
      setDisplay(query); //검색시 className을 추가한다.
    },
    [youtube]
  );

  return (
    <>
      <SearchHeader
        onSearchVideo={handleSearhVideos}
        onMainPage={handleMainPage}
      />
      <main>
        <section className={styles.contents}>
          {selectVideo && (
            <article className={styles.detail}>
              <VideoDetail video={selectVideo} subcribCount={subcribCount} />
            </article>
          )}
          <article
            className={`${styles.video__list} ${display ? styles.flex : ''}`}
          >
            <VideoList
              videos={videos}
              onClickVideo={handleVideoDetail}
              display={display ? 'flex' : null}
            />
          </article>
        </section>
      </main>
    </>
  );
}

export default App;
