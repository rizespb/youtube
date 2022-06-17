import React from 'react'
import './_videoHorizontal.scss'

import { Row, Col } from 'react-bootstrap'
import { AiFillEye } from 'react-icons/ai'
import { useEffect } from 'react'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import moment from 'moment'
import numeral from 'numeral'

import request from '../../api'

const VideoHorizontal = () => {
  const seconds = moment.duration('100').asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')

  return (
    <Row className="videoHorizontal m-1 py-2 align-items-center">
      <Col xs={6} md={4} className="videoHorizontal__left">
        <LazyLoadImage
          src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt=""
          effect="blur"
          className="videoHorizontal__thumbnail"
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        <span className="video__top__duration">{_duration}</span>
      </Col>

      <Col xs={6} md={8} className="videoHorizontal__right p-0">
        <p className="videoHorizontal__title mb-1">Be a full stack developer in 1 month</p>

        <div className="videoHorizontal__details">
          <AiFillEye />
          &nbsp;
          {numeral(100000000).format('0.a')} Views •&nbsp;
          {moment('2020-06-09').fromNow()}
        </div>

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {/* <LazyLoadImage
            src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
            effect="blur"
          /> */}
          <p>Backbench Coder</p>
        </div>
      </Col>
    </Row>
  )
}

export default VideoHorizontal
