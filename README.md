
youtube APIs를 활용한 clone youtube site
===

youtube DATA APIs
---

코드퀄리티를 높이기 위한 시도
async await(Promise)에서 axios로 변경한 이유
1.axios도 똑같이 promise를 사용하지만 다른점은 호환성에서다르다.
자바스크립트에서 제공하는 async는 브라우저 호환성에서 IE는 지원하지 않는다. 또한 받은 response를 json형식으로 변환해야되는 불편함이 존재한다.
결국엔 비동기 통신을 쉽게하긴 하지만 반복되는 브라우저URL을 길게 작성하고 query param들을 가독성이 좋지않게 넣어놓기 떄문에 이를 변경하기 위해 axios를 사용했다.
axios라이브러리를 사용하므로써 코드직관성이 올라갔으며, 모든 브라우저에서 작동하도록 지원하며 IE도 11버전까지 지원하기에 이에 대한 비동기 통신을 좀 더 오류없이 사용할 수 있게 되었다.

2.fetch에서 async로 변경할때 사용점, async에서 axios로 사용할때 가독성에 대한 내용을 적을것.
ex) fetch에서는 .then()의 꼬리에 꼬리를 무는 callback지옥이 펼쳐졌다면, async에선 await를 사용한다는점으로 가독성이 높아졋고,
axios에서는 httpClient주소가 길게 늘어져서 가독성이 안좋았는데 axios 인스턴스를 생성해 baseURL과 param들을 오브젝트 형식으로 기술하여
좀 더 가독성을 높임. 




21.07.28 axios로 변경 후 APIs 호출 시 중복 파라미터 key값에 대한 삽질결과
---

fetch()에서 전체 URL을 적어서 보내던 방식에서 axios를 이용해서 axios.create()와 get() function를 사용해서 객체를 넘겨주는 형식으로 바꿧다.
그런데 거기서 문제가 발생한것은 mostPopular()에서 주소를 넘겨줄때 param의 key중에 part가 2번 호출된다는 점이었다. fetch로 넘길경우 일일히 다 적었기 떄문에 part=blabla&part=blabla2로 적으면 됐지만  axios의 params{}에 넘길경우에는 
            params: {
                part: 'snippet',
                part: 'statistics',                
            },
로 적을 경우  Duplicate key 에러가 발생하여 작동되지 않았다. 구글링한 결과 []에 담아 객체를 보내면 된다기에 손쉽게 끝날 줄 알았는데 여기서부터 긴 삽질이 시작됐다. array에 담아 넘길경우
URL에 parameter가 part[]=snippet&part[]=statistics 로 표현되어 youtube APIs의 request의 status는 200 OK가 뜨지만 올바른 형식으로 호출을 한게 아니라 받아온 data의 값은 아무것도 없어
제대로된 data를 출력할 수 없었다. 

여러가지를 검색 후 해결에 도움이 된 페이지는 stackOverflow에 아래 링크의 글이었다.

https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays

문제는 나는 []를 없애야 되는데 paramsSerializer를 사용하라는데 return 부분에 qs의 변수가 선언되지 않았는데 return을 주어 잘 이해가 되질 않았다. 라이브러리를 별도로 import해서 사용하는것에 아직 익숙치 않아서 발생한 문제인데, 너무 당연히 import해서 사용하는거라 qs에 대한 import처리부분을 설명해주는곳을 찾을 수 없어 1시간넘게 이부분에서 해맸다.

그러던 도중 기초적인 qs가 어떤건지도 모르는체 코드를 복사 붙여넣기로 따라하는것 같아 qs를 검색 후 찾아 낸곳이 아래 링크의 홈페이지였다.

https://www.npmjs.com/package/qs

qs라이브러리로써 문자열에 대한 function를 제공하는 라이브러리였다. 물론 지금 여러가지를 더 찾아보니 function 직접 구현해서 해당URL을 바꿀 수 있었지만 나는 라이브러리를 쓰는것을 택했다.

yarn을 이용해 

(코드블럭 넣기)
yarn add qs 를 통해 

dependencies에 추가하고 사용하려는 해당 js에 import하여 사용 준비를 마쳤고,
axios conifg 항목 중 직렬화를 위해 paramsSerializer 항목에 qs를 이용한 function에 qs의 stringify()를 이용했다. 근데 문제는 해당 URL에

part%5B0%5D=snippet&part%5B1%5D=statistics

%5B0, %5B1등의 문자가 섞여 나오는것이었다 ㅠㅠㅠ

찾아보니 array braket을 URL 인코딩하여 위 형식으로 표기됐단것을 발견했고, 그것에 대한 해결법으로

qs의 stringify 옵션을 'repeat'으로 주어 []을 없이 만드는것으로 해결했다.

qs 사용법 : https://www.npmjs.com/package/qs  arrayFormat 검색
https://axios-http.com/docs/req_config 


별거아닌 일이었지만 이런부분이 미흡한 나에게 필요한 라이브러리를 추가하고 import해서 사용하는방법을 익힌 좋은 시간이었다. 또한 요청 URL을 비교하여 param값이 틀린경우 이에대해 대처하는 방법을 배운것 같다. 



라이브러리를 쓴다는건 의존하는 라이브러리가 생긴다는것이기 때문에 신중하게 고려해서 사용하고, 이 라이브러리의 사용용도에 대해 알아놀을 필요가 있음.
<!-- 웹팩에 대해서도 알아볼것. -->




참조자료 
엑시오스 브라우저 호환성: https://github.com/axios/axios
async 브라우저 호환성 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function 