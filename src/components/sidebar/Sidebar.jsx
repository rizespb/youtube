import React from 'react'
import { useDispatch } from 'react-redux'
import './_sidebar.scss'

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md'
import { log_out } from '../../redux/actions/auth.action'
import { Link } from 'react-router-dom'

const Sidebar = ({ isVisible, handleToggleSidebar }) => {
  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(log_out())
  }

  return (
    <nav className={isVisible ? 'sidebar open' : 'sidebar'} onClick={() => handleToggleSidebar()}>
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>

      <li>
        <Link to="/">
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </Link>
      </li>
      <li>
        <MdThumbUp size={23} />
        <span>LikedVideos</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don't Know</span>
      </li>

      <hr />

      <li onClick={logOutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

      <hr />
    </nav>
  )
}

export default Sidebar
