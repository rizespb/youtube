import React from 'react'

import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'

import './_header.scss'

const Header = ({ handleToggleSidebar }) => {
  return (
    <header className="header border border-dark">
      <FaBars className="header__menu" size={26} onClick={() => handleToggleSidebar()} />

      <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" className="header__logo" />

      <form>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="avatar"
        />
      </div>
    </header>
  )
}

export default Header
