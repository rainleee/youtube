import { useCallback, useEffect, useState } from "react";
import styles from "./app.module.css";
import SearchHeader from "./component/search_header/search_header";
import VideoDetail from "./component/video_detail/video_detail";
import VideoList from "./component/video_list/video_list";

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
      .catch(error => console.log("error", error));
  }, [youtube]);

  //logo click
  const handleMainPage = useCallback(async () => {
    setDisplay(null);
    setSelectVideo(null);

    const result = await youtube
      .mostPopular()
      .catch(error => console.log("error", error));

    setVideos(result);
  }, [youtube]);

  //go to video Player
  const handleVideoDetail = async video => {
    window.scrollTo(0, 0);
    setSelectVideo(video);
    setDisplay("detail");

    const subscriberCount = await youtube
      .subscriberCount(video.snippet.channelId)
      .catch(error => console.log("error", error));
    setSubcribCount(subscriberCount);
  };

  //search videos
  const handleSearhVideos = useCallback(
    async query => {
      setVideos(
        await youtube
          .searchVideo(query)
          .catch(error => console.log("error", error))
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
            className={`${styles.video__list} ${display ? styles.flex : ""}`}
          >
            <VideoList
              videos={videos}
              onClickVideo={handleVideoDetail}
              display={display ? "flex" : null}
              // display={display}
              // searchKeyword={display}
            />
          </article>
        </section>
      </main>
    </>
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
  TODO 21.08.04
  1. fetch 통신을 하는 컴포넌트가 겹쳐져있기 때문에 그부분을 별도로 구성한다.
  2.TODO List 익스텐션 깔기

  TODO 21.08.10
  1.인기 급상승 동영상 useStatus를 이용해서 하는법 다시 고민하기
  2.검색했을때 검색창 사이 간격이 줄어드는 이슈 고치기
  3.메인에서 아래쪽 영상을 클릭했을떄 영상이 먼저안보이고 아래쪽만 보이는것 고치기
  4.상세화면에서 아이프레임과 옆에목록 픽셀 어긋난거 고치기
  
  TODO 21.08.13
  1.iframe 스크롤시 맨위에 영역 침범하는 문제 해결하기
  
  TODO 21.08.14
  1.iframe 스크롤시 맨위에 영역 침범하는 문제 해결하기, 영상마다 크기가 다르게 되는것 해결하기
  2.detail grid veiw와 검색시 grid view를 분리하기. (검색 시 grid view를 바꿀 것.)
  3.detail 시 왼쪽 급상승 게시물을 25개 다 보여줄게 아니라 10개정도만 보여주고 scroll이벤트시 none => view하는 것으로 바꾸기
*/
