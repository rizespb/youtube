import React from 'react'
import './_comment.scss'

import moment from 'moment'

const Comment = () => {
  return (
    <div className="comment p-2 d-flex">
      <img
        src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="avatar"
        className="rounded-circle me-3"
      />

      <div className="comment__body">
        <p className="comment__header mb-1">Ivan Ivanov •&nbsp;{moment('2020-05-06').fromNow()}</p>

        <p className="mb-0">Nice video DUDE!!!</p>
      </div>
    </div>
  )
}

export default Comment
