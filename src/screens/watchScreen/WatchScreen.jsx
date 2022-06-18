import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Comments from '../../components/comments/Comments'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'
import VideoMetaData from '../../components/videoMetaData/VideoMetaData'
import './_watchScreen.scss'
import { useEffect } from 'react'
import { getVideoById } from '../../redux/actions/video.action'

const WatchScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { video, loading } = useSelector((state) => state.selectedVideo)

  useEffect(() => {
    dispatch(getVideoById(id))
  }, [dispatch, id])

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {!loading ? <VideoMetaData video={video} videoId={id} /> : <h6>Loading...</h6>}

        <Comments videoId={id} totalComments = {video?.statistics?.commentCount}/>
      </Col>

      <Col lg={4}>
        {[...new Array(10)].map((_, index) => (
          <VideoHorizontal key={index} />
        ))}
      </Col>
    </Row>
  )
}

export default WatchScreen
