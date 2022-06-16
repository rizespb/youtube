import React from 'react'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesBar from '../../components/categoriesBar'
import Video from '../../components/video'
import { getPopularVideos } from '../../redux/actions/video.action'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const { videos } = useSelector((state) => state.homeVideos)

  // Функция для подгрузки видео при скролле вниз
  const fetchData = () => {
    dispatch(getPopularVideos())
  }

  return (
    <Container>
      <CategoriesBar />

      <Row>
        {/* Порционная подгрузка видео при скролле вниз */}
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          // По-нормальному, тут надо определять: есть еще видео для загрузки или закончились
          hasMore={true}
          loader={<div className="spinner-border text-danger d-block mx-auto"></div>}
          className="row"
        >
          {videos.map((video) => (
            // В некоторых запросах id видео - это строка, а в некоторых - объект
            <Col lg={3} md={4} key={video.id?.videoId || video.id}>
              <Video video={video} />
            </Col>
          ))}
        </InfiniteScroll>
      </Row>
    </Container>
  )
}

export default HomeScreen
