
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


axios로 변경 후 APIs 호출 시 중복 파라미터 key값에 대한 삽질결과
fetch()에서 전체 URL을 적어서 보내던 방식에서 



라이브러리를 쓴다는건 의존하는 라이브러리가 생긴다는것이기 때문에 신중하게 고려해서 사용하고, 이 라이브러리의 사용용도에 대해 알아놀을 필요가 있음.
<!-- 웹팩에 대해서도 알아볼것. -->




참조자료 
엑시오스 브라우저 호환성: https://github.com/axios/axios
async 브라우저 호환성 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function 




qs 사용법 : https://www.npmjs.com/package/qs  arrayFormat 검색
