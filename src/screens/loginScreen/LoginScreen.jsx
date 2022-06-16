import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../redux/actions/auth.action'
import './_loginScreen.scss'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const accessToken = useSelector((state) => state.auth.accessToken)

  const handleLogin = () => {
    dispatch(login())
  }

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />

        <button onClick={handleLogin}>Login with Google</button>

        <p>This Project is made using Youtube Data API</p>
      </div>
    </div>
  )
}

export default LoginScreen
