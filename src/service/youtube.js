// youtube APIs 비동기통신 class 정의

class Youtube {
    constructor(key) {
        this.key = key;
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
    }
    async mostPopular() {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=${this.key}&part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR`, this.getRequestOptions);
        return await response.json();
    }

    async searchVideo(query) {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${this.key}&type=video&part=snippet&maxResults=25&q=${query}&nextPageToken=CBkQAA`, this.getRequestOptions);
        const result = await response.json();
        return result.items.map(item => ({ ...item, id: item.id.videoId }));
        /*   return fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${this.key}&type=video&part=snippet&maxResults=25&q=${query}&nextPageToken=CBkQAA`, this.getRequestOptions)
              .then(response => response.json())
              .then(result =>
                  result.items.map(item => ({ ...item, id: item.id.videoId }))
            )*/
    }

    async subscriberCount(channelId) {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${this.key}&part=statistics&id=${channelId}`, this.getRequestOptions);
        return await response.json();
        /* return fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${this.key}&part=statistics&id=${channelId}`, this.getRequestOptions)
            .then(response => response.json()) */
    }

}


export default Youtube;