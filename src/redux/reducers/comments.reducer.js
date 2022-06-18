import { COMMENTS_LIST_FAIL, COMMENTS_LIST_REQUEST, COMMENTS_LIST_SUCCESS } from '../actionTypes'

const initialState = {
  comments: null,
  loading: true,
}

// Комментарии к видео на странице просмотра видео WatchScreen
export const commentsListReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case COMMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        comments: payload,
        loading: false,
      }

    case COMMENTS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }

    default:
      return state
  }
}
