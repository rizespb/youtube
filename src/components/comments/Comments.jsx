import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsOfVideoByVideoId, addComment } from '../../redux/actions/comments.action'
import Comment from './comment/Comment'
import './_comments.scss'

const Comments = ({ videoId, totalComments }) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const comments = useSelector((state) => state.commentsList.comments)

  const _comments = comments?.map((comment) => comment.snippet.topLevelComment.snippet)

  useEffect(() => {
    dispatch(getCommentsOfVideoByVideoId(videoId))
  }, [videoId, dispatch])

  const handleComment = (e) => {
    e.preventDefault()

    if (text.length === 0) return
    dispatch(addComment(videoId, text))
    setText('')
  }

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img
          src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="avatar"
          className="rounded-circle me-3"
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>

      <div className="comments__list">
        {_comments?.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Comments
