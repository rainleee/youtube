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

    async searchVideo(query) {
        const response = await this.youtube.get('search', {
            params: {
                type: 'video',
                part: 'snippet',
                maxResults: 25,
                q: query,
                nextPageToken: 'CBkQAA',
            }
        })

        return response.data.items.map(item => ({ ...item, id: item.id.videoId }));
    }

    async subscriberCount(channelId) {
        const response = await this.youtube.get('channels', {
            params: {
                part: 'statistics',
                id: channelId,
            }
        })

        return response.data.items[0].statistics.subscriberCount;
    }
}


export default Youtube;