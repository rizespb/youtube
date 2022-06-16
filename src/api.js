import axios from 'axios'

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: {
    // key добавляет query параметры к строке запроса
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
})

export default request
