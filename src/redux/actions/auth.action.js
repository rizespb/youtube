import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from 'firebase/auth'

import { auth } from '../../firebase'
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from '../actionTypes'

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    })

    const provider = new GoogleAuthProvider()

    // https://developers.google.com/youtube/v3/guides/auth/installed-apps
    // Возможно, эта строка добавляет возможность аккаунту Google "Просматривать, редактировать и безвозвратно удалять свои видео, рейтинги, комментарии и подписи на YouTube." Закомментировал, т.к. Гугл иногда банит такие приложения
    // provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')

    const res = await signInWithPopup(auth, provider)

    const accessToken = res.user.accessToken

    const profile = {
      name: res.user.displayName,
      photoUrl: res.user.photoURL,
    }

    sessionStorage.setItem('youtube-accessToken', accessToken)
    sessionStorage.setItem('youtube-user', JSON.stringify(profile))

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken,
      },
    })

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    })
  } catch (error) {
    console.log(error.message)
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    })
  }
}

export const log_out = () => async (dispatch) => {
  const auth = getAuth()

  await signOut(auth)

  dispatch({
    type: LOG_OUT,
  })

  sessionStorage.removeItem('youtube-accessToken')
  sessionStorage.removeItem('youtube-user')
}
