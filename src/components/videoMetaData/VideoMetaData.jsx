import React from 'react'
import './_videoMetaData.scss'

import moment from 'moment'
import numeral from 'numeral'

import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import ShowMoreText from 'react-show-more-text'

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet
  const { viewCount, likeCount } = statistics

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData__top">
        <h5>{title}</h5>

        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format('0.a')} Views • {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="me-3">
              <MdThumbUp size={26} />
              &nbsp;
              {numeral(likeCount).format('0.a')}
            </span>
            <span>
              <MdThumbDown size={26} />
              &nbsp;
              {numeral(17).format('0.a')}
            </span>
          </div>
        </div>
      </div>

      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-3 py-3">
        <div className="d-flex">
          <img
            src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="avatar"
            className="rounded-circle me-3"
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>{numeral(10000).format('0.a')} Subscribers</span>
          </div>
        </div>

        <button className="btn border-0 p-2 m-2">Subscribe</button>
      </div>

      <div className="videoMetaData__description">
        <ShowMoreText lines={3} more="SHOW MORE" less="SHOW LESS" anchorClass="showMoreText" expanded={false}>
          {description}
        </ShowMoreText>
      </div>
    </div>
  )
}

export default VideoMetaData
