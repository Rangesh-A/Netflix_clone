import React from 'react'
import './HomeScreen.css'
import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Nav/banner/Banner'
import Row from '../../components/Nav/Row/Row'
import requests from '../../helpers/requests'

const HomeScreen = () => {
  return (
    <div className='homeScreen'>
        
        <Nav />
        <Banner />
        <Row  title="Netflix Originals" fetchUrl={requests.fetchNetFlixOriginals} isLarge={true}/>
        <Row  title="Trending Movies" fetchUrl={requests.fetchTrending} isLarge={false}/>
        <Row  title="Top Rated Movies" fetchUrl={requests.fetchTopRated} isLarge={false}/>
        <Row  title="Action Movies" fetchUrl={requests.fetchTrending} isLarge={false}/>
        <Row  title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} isLarge={false}/>
        <Row  title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} isLarge={false}/>
        <Row  title="Documentary Movies" fetchUrl={requests.fetchDocumentaries} isLarge={false}/>
    </div>
  )
}

export default HomeScreen