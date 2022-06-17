import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SELECTOR_VIDEO_FAIL,
  SELECTOR_VIDEO_REQUEST,
  SELECTOR_VIDEO_SUCCESS,
} from '../actionTypes'

const homeVideosInitialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: 'All',
}

// Обрабатываем видео на главной странице
export const homeVideosReducer = (state = homeVideosInitialState, action) => {
  const { type, payload } = action

  switch (type) {
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,

        // Если категория в Pyaload отличается от текущей, значит мы загружаем видео для новой категории и надо удалиь старые видео
        // Если активная категория совпадает с категорией в payload, значит идет подгрузка видео при скролле вниз. И новые видео надо добавиь к имеющимся
        videos: state.activeCategory === payload.category ? [...state.videos, ...payload.videos] : payload.videos,
        nextPageToken: payload.nextPageToken,
        loading: false,
        activeCategory: payload.category,
      }

    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }

    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    default:
      return state
  }
}

const selectedVideoInitialState = {
  loading: true,
  video: null,
}

// Обрабатываем видео на странице видео /watch/:{id}
export const selectedVideoReducer = (state = selectedVideoInitialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SELECTOR_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case SELECTOR_VIDEO_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      }

    case SELECTOR_VIDEO_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload,
      }

    default:
      return state
  }
}
