import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SELECTOR_VIDEO_FAIL,
  SELECTOR_VIDEO_REQUEST,
  SELECTOR_VIDEO_SUCCESS,
} from '../actionTypes'
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
        maxResults: 33,
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

export const getVideosByCategory = (category) => async (disptach, getState) => {
  try {
    disptach({
      type: HOME_VIDEOS_REQUEST,
    })

    const { data } = await request.get('/search', {
      // Добавляем query параметры
      params: {
        part: 'snippet',
        maxResults: 33,
        // Не совсем понимаю, почему при клике на категорию мы к запросы добавляем nextPageToken, полученный при загрузке просто mostPopular
        // Но с ним и без него приходят разные результаты (но все результаты релевантны)
        pageToken: getState().homeVideos.nextPageToken,
        q: category,
        type: 'video',
      },
    })

    disptach({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: category,
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

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTOR_VIDEO_REQUEST,
    })

    const { data } = await request('/videos', {
      params: {
        part: 'snippet,statistics',
        id,
      },
    })

    dispatch({
      type: SELECTOR_VIDEO_SUCCESS,
      payload: data.items[0],
    })
  } catch (error) {
    console.log(error.message)

    dispatch({
      type: SELECTOR_VIDEO_FAIL,
      paylod: error.message,
    })
  }
}
