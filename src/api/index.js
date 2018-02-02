import axios from 'axios'
import conf from '@/config'

const api = axios.create({
    baseURL: conf.remoteUrl,
    headers: {
        'Authorization': 'Token token=' + conf.apiKey
    }
})

export default api
