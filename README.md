# react와 youtube APIs를 활용한 나만의 youtube site 만들기

# youtube DATA APIs

<!-- 전체개요 작성 -->
전체개요1

# Code Refactoring (코드 퀄리티를 높이기 위한 시도)

## 비동기 통신 fetch API => axios로 변경

- 뛰어난 브라우저 호환성

|                                                                                                                                     Fetch API                                                                                                                                      |                                                                                                       axios                                                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/50471668/127454334-b41eda40-3eaf-4f21-a4b0-9a41eb73530c.png" width="600" height="200" alt="Fetch API 브라우저 호환성"> [참조링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) | <img src="https://user-images.githubusercontent.com/50471668/127454355-7f8f2bf2-3dcb-41e1-b8fe-26bbd4b1ad40.png" width="600" height="200" alt="axops 브라우저 호환성" > [참조링크](https://github.com/axios/axios) |

- json 변환 과정 불필요

response 객체에서 data를 쉽게 사용하려면 fetch에선 json으로 변환하는 과정이 필요하다. 매번 데이터를 받아와 반복적으로 json으로 변환하는 과정이 일어나 최소화하는 방법을 찾던 중 axios에선 변환과정이 불필요하단것을 알게되었다.

- 코드 가독성

```js

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

같은 mostPopular()를 작성하였을때 코드 가독성이다. 어느것이 더 직관성이 좋은 것 같은가?

fetch()는 인자값에 URL을 String으로 작성하여 baseURL과 param의 값이 한눈에 들어오지 않지만,axios 라이브러리를 이용할 경우 params option을 이용하여 작성하니 한눈에 알아볼 수 있게 직관성과 가독성이 좋은 코드를 작성할 수 있었다.

<!-- 2.fetch에서 async로 변경할때 사용점, async에서 axios로 사용할때 가독성에 대한 내용을 적을것.
ex) fetch에서는 .then()의 꼬리에 꼬리를 무는 callback지옥이 펼쳐졌다면, async에선 await를 사용한다는점으로 가독성이 높아졋고,
axios에서는 httpClient주소가 길게 늘어져서 가독성이 안좋았는데 axios 인스턴스를 생성해 baseURL과 param들을 오브젝트 형식으로 기술하여
좀 더 가독성을 높임. -->

### **21.07.28 axios로 변경 후 URL 호출 이슈**

---

fetch()에서 전체 URL을 적어서 보내던 방식에서 axios를 이용해서 axios.create()를 통해 baseURL와 option을 설정하고, get() method를 사용해서 params option을 이용해 값을 return해 오는 코드로 변경하였다.

fetch로 작성했을때완 다른 이슈가 발생했는데 바로 **Duplicate key error**.

youtube APIs URL을 호출할 때, part라는 param의 key를 value가 다르게 2번 호출하는데, 이를 아래와 같이 호출할 경우 **Duplicate key error**로 인해 올바른 호출을 수행할 수 없었다.

```js
params: {
    part: 'snippet',
    part: 'statistics',
 },
```

생각해보면 key를 중복작성한게 error 나는게 당연하다고 생각해 이번에는 array로 변경해서 넘겼다.하지만 이는 또 다른 이슈를 불러왔다..

```js
    //input params
    params: {
        part: ['snippet','statistics'],
    },

    //output URL param
    part%5B0%5D=snippet&part%5B1%5D=statistics

    //expected output URL param
    part=snippet&part=statistics
```

처음에는 HTTP 통신 status가 200OK가 떠서 query string이 잘못된지 몰랐지만, 안에 data가 올바르게 들어있지 않은걸보고 역추적하다가 query string이 youtube API가 읽지 못하는 문법으로 request 되고있는것을 발견했다. Array에 넣고 중복키 이슈를 없애면 손쉽게 끝날 줄 알았는데 여기서부터 무지에 의한 삽질이 시작되었다.

여러가지를 검색 후 해결에 도움이 된 곳은 [stackOverflow](https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays) 글이었다.

위 글을 보고 axios 문서를 읽어보니 paramsSerializer option을 사용하여 직렬화하는 방법에 대해 알게되었다.

```js
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
```

여기서 한번 더 깨달은게 있다. **코드를 단순히 복붙하지말고 제대로 읽어보고 활용하자.**

> 코드를 붙여넣기만하고 사용법을 파악하지않고 왜 안되지? 라는 생각만했다.

~~주석만 읽어도 qs문서를 보고 option을 적용하면 되는것을 콘솔창만 보여 왜 안될까 생각하며 1시간이나 헤멨다.~~

위 paramsSerializer option을 사용하고 URL을 보는데 `%5B0%5D`같은 특수문자가 뭔지 궁금해져서 검색해봤다. 검색결과 URL 인코딩하여 특수문자로 표기됐단것을 알게되었다.

```
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

```
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

해결법을 찾고나니 별거 아니었지만 늘 코딩을 할 때 드는 생각이있다.

> 단순히 복붙해서 해결할 생각을 하지말고, 에러부분을 정확히 파악해서 정확한 솔루션을 내리자. 코드를 작성할 때는 아무생각없이 하지말자.

처음쓰는 라이브러리라 당황했지만 결국에는 사용법은 같고, 문서를 보고 적절하게 쓴다면 빠르고 정확하게 에러를 해결할 수 있을것 같다.

---

<!-- 웹팩에 대해서도 알아볼것. -->
<!-- git에 대해서도 공부 및 포스팅 -->
