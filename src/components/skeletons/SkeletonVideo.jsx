import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonVideo = () => {
  return (
    <div style={{ width: '100%', margin: '1rem 0' }}>
      <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
        <Skeleton height={180} />

        <div>
          <Skeleton style={{ margin: '0.5rem' }} circle width={40} height={40} inline={true} />
          <Skeleton width="75%" height={40} />
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default SkeletonVideo
