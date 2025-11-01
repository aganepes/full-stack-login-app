import React from 'react'
import image from '../assets/loading.gif';

function Loading() {
  return (
    <div className="loading_container">
        <img className='loading_message' src={image} alt="Loading..." />
    </div>
  )
}

export default Loading