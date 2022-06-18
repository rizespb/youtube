import React from 'react'
import './_videoMetaData.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'
import numeral from 'numeral'

import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import ShowMoreText from 'react-show-more-text'

import { getChannelDetails, checkSubsciptionStatus } from '../../redux/actions/channel.action'

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet
  const { viewCount, likeCount } = statistics

  const dispatch = useDispatch()

  const { snippet: channelSnippet, statistics: channelStatistics } = useSelector(
    (state) => state.channelDetails.channel
  )

  const { subscriptionStatus } = useSelector((state) => state.channelDetails)

  useEffect(() => {
    dispatch(getChannelDetails(channelId))

    // Проверяем, подписан ли авторизованный юзер на канал
    // Почему-то каждый раз приходит ответ Request had invalid authentication credentials.
    dispatch(checkSubsciptionStatus(channelId))
  }, [channelId, dispatch])

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

      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img src={channelSnippet?.thumbnails?.default?.url} alt="avatar" className="rounded-circle me-3" />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>{numeral(10000).format('0.a')} Subscribers</span>
          </div>
        </div>

        <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}>
          {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
        </button>
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
