import React from 'react'
import './SplashScreen.css'
import Intro from '../videos/Netflix_logo.mp4'

const SplashScreen = () => {
  return (
    <div className='splash_screen'>
        <video autoPlay muted>
            <source src={Intro} type="video/mp4" />
        </video>
    </div>
  )
}

export default SplashScreen