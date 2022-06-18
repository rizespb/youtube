import {
  COMMENTS_LIST_FAIL,
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from '../actionTypes'
import request from '../../api'

export const getCommentsOfVideoByVideoId = (videoId) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENTS_LIST_REQUEST,
    })

    const { data } = await request('/commentThreads', {
      params: {
        part: 'snippet',
        videoId,
      },
    })

    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: data.items,
    })
  } catch (error) {
    console.log(error.response.data)

    dispatch({
      type: COMMENTS_LIST_FAIL,
      paylod: error.response.data.message,
    })
  }
}

export const addComment = (videoId, text) => async (dispatch, getState) => {
  try {
    const obj = {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    }

    // Почему-то каждый раз приходит ответ Request had invalid authentication credentials.
    await request.post('/commentThreads', obj, {
      params: {
        part: 'snippet',
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    })

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    })

    // Обновляем комментарии после упешного добавления коммента
    // Делаем через таймер, чтобы новый коммент успел добавиться в БД
    setTimeout(() => {
      dispatch(getCommentsOfVideoByVideoId(videoId))
    }, 3000)
  } catch (error) {
    console.log(error.response.data)

    dispatch({
      type: CREATE_COMMENT_FAIL,
      paylod: error.response.data.message,
    })
  }
}
