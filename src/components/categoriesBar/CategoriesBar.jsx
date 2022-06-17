import React from 'react'
import './_categoriesBar.scss'
import { keywords } from './CategoriesBar.data'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/video.action'

const CategoriesBar = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const disptach = useDispatch()

  const handleCilck = (category) => {
    setActiveCategory(category)
    if (category === 'All') disptach(getPopularVideos())
    else disptach(getVideosByCategory(category))
  }

  return (
    <div className="categoriesBar">
      {keywords.map((category, index) => (
        <span onClick={() => handleCilck(category)} key={index} className={activeCategory === category ? 'active' : ''}>
          {category}
        </span>
      ))}
    </div>
  )
}

export default CategoriesBar
