import React from 'react'
import { useHistory } from 'react-router-dom'
import './_video.scss'

import { AiFillEye } from 'react-icons/ai'
import { useEffect } from 'react'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
    contentDetails,
    statistics,
  } = video

  // При клике по категории (запрос на www.googleapis.com/youtube/v3/search) нельзя получить  contentDetails и statistics
  // Чтобы не совершать много запросов (из-за квоты Ютуб) заменяем эти данные на хардкод
  const duration = contentDetails?.duration || 0
  const views = statistics?.viewCount || 77777

  // @TODO раскомментировать вместе со вторым useEffect
  // const [channelIcon, setChannelIcon] = useState(null)
  const [channelIcon, setChannelIcon] = useState({ url: 'https://cdn-icons-png.flaticon.com/512/7732/7732494.png' })

  // Продолжительность видео duration приходит в формате SO 8601
  // Конвертируем в минуты:секунды
  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')

  // В некоторых запросах id видео - это строка, а в некоторых - объект
  const _videoId = id?.videoId || id

  const history = useHistory()

  // Этот useEffect избыточен
  // В нем мы запрашиваем детали и статистику по каждрму видео
  // Но эти данные уже содержатся в ответе сервера в video.action.js getPopularVideos
  // Поэтому отключил этот useEffect

  // const [views, setViews] = useState(null)
  // const [duration, setDuration] = useState(null)
  // useEffect(() => {
  //   const getVideoDetails = async () => {
  //     const {
  //       data: { items },
  //     } = await request('/videos', {
  //       params: {
  //         part: 'contentDetails,statistics',
  //         id: _videoId,
  //       },
  //     })

  //     setDuration(items[0].contentDetails.duration)
  //     setViews(items[0].statistics.viewCount)
  //   }

  //   getVideoDetails()
  // }, [_videoId])

  // @TODO расскомментировать
  // // Получаем изображение канала
  // useEffect(() => {
  //   const getChannelIcon = async () => {
  //     const {
  //       data: { items },
  //     } = await request('/channels', {
  //       params: {
  //         part: 'snippet',
  //         id: channelId,
  //       },
  //     })

  //     setChannelIcon(items[0].snippet.thumbnails.default)
  //   }

  //   getChannelIcon()
  // }, [channelId])

  const handleVideoCLick = () => {
    history.push(`/watch/${_videoId}`)
  }

  return (
    <div className="video" onClick={handleVideoCLick}>
      <div className="video__top">
        {/* <img src={medium.url} alt="" /> */}
        <LazyLoadImage src={medium.url} alt="" effect="blur" />
        <span className="video__top__duration">{_duration}</span>
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
        {/* <LazyLoadImage src={channelIcon?.url} alt="" effect="blur" /> */}
        <p>{channelTitle}</p>
      </div>
    </div>
  )
}

export default Video
