import React from 'react'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesBar from '../../components/categoriesBar'
import Video from '../../components/video'
import { getPopularVideos, getVideosByCategory, setLoading } from '../../redux/actions/video.action'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const { videos, activeCategory, loading } = useSelector((state) => state.homeVideos)

  // Функция для подгрузки видео при скролле вниз
  const fetchData = () => {
    if (activeCategory === 'All') dispatch(getPopularVideos())
    else dispatch(getVideosByCategory(activeCategory))
  }

  return (
    <Container>
      <CategoriesBar />

      {/* Порционная подгрузка видео при скролле вниз */}
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        // По-нормальному, тут надо определять: есть еще видео для загрузки или закончились
        hasMore={true}
        loader={<div className="spinner-border text-danger d-block mx-auto"></div>}
        className="row"
      >
        {!loading
          ? videos.map((video, index) => (
              // В некоторых запросах id видео - это строка, а в некоторых - объект
              <Col lg={3} md={4} key={`${video.id?.videoId || video.id}-${index}`}>
                <Video video={video} />
              </Col>
            ))
          : [...new Array(20)].map((_, index) => (
              <Col lg={3} md={4} key={index}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  )
}

export default HomeScreen
