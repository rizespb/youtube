import React from 'react'
import './_video.scss'

import { AiFillEye } from 'react-icons/ai'
import { useEffect } from 'react'
import { useState } from 'react'

import moment from 'moment'
import numeral from 'numeral'

import request from '../../api'

const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video

  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)
  const [channelIcon, setChannelIcon] = useState(null)

  // Продолжительность видео duration приходит в формате SO 8601
  // Конвертируем в минуты:секунды
  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')

  // В некоторых запросах id видео - это строка, а в некоторых - объект
  const _videoId = id?.videoId || id

  // Этот useEffect избыточен
  // В нем мы запрашиваем детали и статистику по каждрму видео
  // Но эти данные уже содержатся в ответе сервера в video.action.js getPopularVideos
  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: _videoId,
        },
      })

      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }

    getVideoDetails()
  }, [_videoId])

  // Получаем изображение канала
  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      })

      setChannelIcon(items[0].snippet.thumbnails.default)
    }

    getChannelIcon()
  }, [channelId])

  return (
    <div className="video">
      <div className="video__top">
        <img src={medium.url} alt="" />
        <span>{_duration}</span>
      </div>

      <div className="video__title">{title}</div>

      <div className="video__details">
        <span>
          <AiFillEye />
          {numeral(views).format('0.a')} Views •&nbsp;
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>

      <div className="video__channel">
        <img src={channelIcon?.url} alt="" />
        <p>{channelTitle}</p>
      </div>
    </div>
  )
}

export default Video
