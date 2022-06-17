import React from 'react'
import Comment from './comment/Comment'
import './_comments.scss'

const Comments = () => {
  const handleComment = () => {}

  return (
    <div className="comments">
      <p>1234 Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img
          src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="avatar"
          className="rounded-circle me-3"
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input type="text" className="flex-grow-1" placeholder="Write a comment..." />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>

      <div className="comments__list">
        {[...new Array(15)].map((_, index) => (
          <Comment key={index} />
        ))}
      </div>
    </div>
  )
}

export default Comments
