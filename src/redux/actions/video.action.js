import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from '../actionTypes'
import request from '../../api'

export const getPopularVideos = () => async (disptach, getState) => {
  try {
    disptach({
      type: HOME_VIDEOS_REQUEST,
    })

    const { data } = await request.get('/videos', {
      // Добавляем query параметры
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'RU',
        maxResults: 25,
        pageToken: getState().homeVideos.nextPageToken,
      },
    })

    disptach({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: 'All',
      },
    })
  } catch (error) {
    console.log(error.message)

    disptach({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    })
  }
}

export const getVideosByCategory = (keyword) => async (disptach, getState) => {
  try {
    disptach({
      type: HOME_VIDEOS_REQUEST,
    })

    const { data } = await request.get('/search', {
      // Добавляем query параметры
      params: {
        part: 'snippet',
        maxResults: 25,
        // Не совсем понимаю, почему при клике на категорию мы к запросы добавляем nextPageToken, полученный при загрузке просто mostPopular
        // Но с ним и без него приходят разные результаты (но все результаты релевантны)
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: 'video',
      },
    })

    disptach({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    })
  } catch (error) {
    console.log(error.message)

    disptach({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    })
  }
}
