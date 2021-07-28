import axios from 'axios';
import qs from 'qs';

class Youtube {
    constructor(key) {
        //axios instancs create
        this.youtube = axios.create({
            baseURL: 'https://youtube.googleapis.com/youtube/v3',
            params: {
                key: key
            },
        })
    }

    async mostPopular() {
        const response = this.youtube.get('videos', {
            params: {
                part: ['snippet', 'statistics'],
                chart: 'mostPopular',
                maxResults: 25,
                regionCode: 'KR',
            },

            paramsSerializer: params => {
                console.log('params');
                console.log(qs.stringify(params));
                console.log(qs.stringify(params, { arrayFormat: 'repeat' }));
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        })

        console.log('response');
        console.log(await response);
        // console.log((await response).data);
        return (await response).data;
        // const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=${this.key}&part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR`, this.getRequestOptions);
        // return await response.json();
    }

    async searchVideo(query) {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${this.key}&type=video&part=snippet&maxResults=25&q=${query}&nextPageToken=CBkQAA`, this.getRequestOptions);
        const result = await response.json();
        return result.items.map(item => ({ ...item, id: item.id.videoId }));
    }

    async subscriberCount(channelId) {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${this.key}&part=statistics&id=${channelId}`, this.getRequestOptions);
        return await response.json();
    }

}


export default Youtube;