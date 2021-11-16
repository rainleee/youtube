# Project Name: Youtube clone coding

- 최종버전 1.0 ver (2021/8/18)

- Youtube API를 활용한 유튜브 클론코딩 웹 프로젝트이다. 메인화면에는 '인기 급상승 동영상'이 표시되게 하였다. 동영상 상세화면에서 채널명, 구독자, 상세설명, 게시일 등을 표시하였으며, 우측에는 기존 '인기 급상승 동영상'을 표시해 다른 동영상으로 쉽게 넘어갈 수 있게 구성하였다. 또한, 상단 가운데 '검색'박스를 통해 원하는 키워드의 영상을 검색할 수 있다.

- 이 웹 프로젝트는 현재 PC 버전만 지원하며, 크롬 기준으로 개발되었습니다. 다른 브라우저상에서 제대로 나오지 않을 수 있습니다.

## Index

- Project Name: Youtube clone coding

1. [프로젝트 설명](#1장-프로젝트설명)
   - [Environment](#environment)
   - [Prerequisite](#prerequisite)
2. [Code Refactoring](#2장-code-refactoring)
   1. [Axios](#2-1장-비동기통신-fetch-api에서-axios-라이브러리로-변경)
      - [Fetch API에서 Axios로 리팩토링한 이유는?](#axios로-refactoring한-이유)
      - [Axios로 변경 후 URL 호출 이슈](#21-07-28-Axios로-변경-후-URL-호출-이슈)
3. [마무리하며](#3장-마무리하며)

## 1장 프로젝트설명

## Environment

#### 설치언어 버전 및 사용스킬

- front-end

  - JavaScript ES6
  - HTML5 & CSS3
  - React v 17.0
  - Axios v 0.23

- back-end

  - Node js v 16.10
  - NPM
  - Yarn
  - Youtube APIs

## Prerequisite

- Youtube APIs key
- 노드환경파일 .env에 APIs key를 보관하였다. 각자의 환경에 맞춰서 APIs key를 공개하지 말고 구현할 것.

# 2장 Code Refactoring

## 2-1장 비동기통신 fetch API에서 Axios 라이브러리로 변경

### Axios로 Refactoring한 이유

- 뛰어난 브라우저 호환성

|                                                                                                                                     Fetch API                                                                                                                                      |                                                                                                       Axios                                                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/50471668/127454334-b41eda40-3eaf-4f21-a4b0-9a41eb73530c.png" width="600" height="200" alt="Fetch API 브라우저 호환성"> [참조링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) | <img src="https://user-images.githubusercontent.com/50471668/127454355-7f8f2bf2-3dcb-41e1-b8fe-26bbd4b1ad40.png" width="600" height="200" alt="axops 브라우저 호환성" > [참조링크](https://github.com/axios/axios) |

- JSON 변환 과정 불필요

response 객체에서 data를 쉽게 사용하려면 fetch에선 JSON으로 변환하는 과정이 필요하다. 매번 데이터를 받아와 반복적으로 JSON으로 변환하는 과정이 일어나 최소화하는 방법을 찾던 중 Axios에선 변환과정이 불필요하단 것을 알게 되었다.

- 코드 가독성

```JavaScript

//fetch
async mostPopular() {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=[YOUR_API_KEY]&part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR`, this.getRequestOptions);
    return await response.json();
}


//axios
async mostPopular() {
    const response = await this.youtube.get('videos', {
        params: {
            part: ['snippet', 'statistics'],
            chart: 'mostPopular',
            maxResults: 25,
            regionCode: 'KR',
        },
        //array bracket remove
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        }
    })
    return response.data.items;
}
```

같은 mostPopular()를 작성하였을 때 코드 가독성이다. 어느 것이 더 직관성이 좋은 것 같은가?

fetch()는 인자 값에 URL을 String으로 작성하여 baseURL과 param의 값이 한눈에 들어오지 않지만,Axios 라이브러리를 이용할 경우 params option을 이용하여 작성하니 한눈에 알아볼 수 있게 직관성과 가독성이 좋은 코드를 작성할 수 있었다.

### **21-07-28 Axios로 변경 후 URL 호출 이슈**

---

fetch()에서 전체 URL을 적어서 보내던 방식에서 Axios를 이용해서 axios.create()를 통해 baseURL와 option을 설정하고, get() method를 사용해서 params option을 이용해 값을 return해 오는 코드로 변경하였다.

fetch로 작성했을 때와는 다른 이슈가 발생했는데 바로 **Duplicate key error**.

Youtube APIs URL을 호출할 때, part라는 param의 key를 value가 다르게 2번 호출하는데, 이를 아래와 같이 호출할 경우 **Duplicate key error**로 인해 올바른 호출을 수행할 수 없었다.

```javaScript
params: {
    part: 'snippet',
    part: 'statistics',
 },
```

생각해보면 key를 중복 작성한 게 error 나는 게 당연하다고 생각해 이번에는 array로 변경해서 넘겼다.하지만 이는 또 다른 이슈를 불러왔다..

```javaScript
    //input params
    params: {
        part: ['snippet','statistics'],
    },

    //output URL param
    part%5B0%5D=snippet&part%5B1%5D=statistics

    //expected output URL param
    part=snippet&part=statistics
```

처음에는 HTTP 통신 status가 200 OK가 떠서 query string이 잘못된 지 몰랐지만, 안에 data가 올바르게 들어있지 않은 걸 보고 역추적하다가 query string이 Youtube APIs가 읽지 못하는 문법으로 request 되고 있는 것을 발견했다. Array에 넣고 중복키 이슈를 없애면 손쉽게 끝날 줄 알았는데 여기서부터 무지에 의한 삽질이 시작되었다.

여러 가지를 검색 후 해결에 도움이 된 곳은 [stackOverflow](https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays) 글이었다.

위 글을 보고 Axios 문서를 읽어보니 paramsSerializer option을 사용하여 직렬화하는 방법에 대해 알게 되었다.

```javaScript
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
```

여기서 한번 더 깨달은 게 있다. **코드를 단순히 복붙하지말고 제대로 읽어보고 활용하자.**

> 코드를 붙여 넣기만 하고 사용법을 파악하지 않고 왜 안 되지? 라는 생각만 했다.

~~주석만 읽어도 qs문서를 보고 option을 적용하면 되는 것을 콘솔창만 보여 왜 안될까 생각하며 1시간이나 헤맸다.~~

위 paramsSerializer option을 사용하고 URL을 보는데 `%5B0%5D`같은 특수문자가 뭔지 궁금해져서 검색해봤다. 검색결과 URL 인코딩하여 특수문자로 표기됐단 것을 알게 되었다.

```javaScript
   //output URL param
    part%5B0%5D=snippet&part%5B1%5D=statistics

    //expected output URL param
    part=snippet&part=statistics
```

| URL encoding | URL decoding | decoding param value |
| :----------: | :----------: | :------------------: |
|     %5B      |      [       |   part[0]=snippet    |
|     %5D      |      ]       |  part[1]=statistics  |

그것에 대한 해결법으로 [qs](https://www.npmjs.com/package/qs)의 문서를 보고 **stringify 옵션을 'repeat'** 으로 주어 []을 없이 만드는것으로 해결했다.

```javaScript
    //qs stringify arrayFormat option

     qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
    // 'a=b&a=c'


    qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
    // 'a[0]=b&a[1]=c'

    qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
    // 'a[]=b&a[]=c'

    qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })
    // 'a=b,c'
```

## 3장 마무리하며

- 위에 URL 호출이슈의 해결법을 찾고 나니 별거 아니었지만, 늘 코딩을 할 때 드는 생각이 있다. 단순히 복사해서 해결할 생각을 하지말고, 에러부분을 정확히 파악해서 정확한 솔루션을 내리자. 코드를 작성할 때는 아무 생각 없이 하지 말자. 처음 쓰는 라이브러리라 당황했지만 결국에는 사용법은 같고, 문서를 보고 적절하게 쓴다면 빠르고 정확하게 에러를 해결할 수 있을 것 같다.
