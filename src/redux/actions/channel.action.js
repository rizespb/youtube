import request from '../../api'
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from '../actionTypes'

export const getChannelDetails = (channelId) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    })

    const { data } = await request('/channels', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: channelId,
      },
    })

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    })
  } catch (error) {
    console.log(error.response.data)

    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      paylod: error.response.data,
    })
  }
}

// Проверяем, подписан ли юзер на канал
export const checkSubsciptionStatus = (channelId) => async (dispatch, getState) => {
  try {
    // Почему-то каждый раз приходит ответ Request had invalid authentication credentials.
    const { data } = await request('/subscriptions', {
      params: {
        part: 'snippet',
        forChannelId: channelId,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    })

    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    })
  } catch (error) {
     // Т.к. каждый раз приходит ошибка авторизации, поэтому диспатчим статус false - не подписан на канал
    console.log(error.response.data)
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: false,
    })
  }
}
