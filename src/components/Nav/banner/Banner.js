import axios from '../../../helpers/axios';
import React, { useEffect,useState} from 'react'
import './Banner.css'
import requests from '../../../helpers/requests';
const Banner = () => {
    const [movie, setMovie] = useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const request=await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                Math.floor(Math.random()*request.data.results.length)
            ]
            );
            return request;
        };
        fetchData();
    },[])
    // console.log(movie);
    function trucate(string ,n){
        return string?.length>n?string.substr(0,n-1)+"...":string;
    }
  return (
    <header className='banner'
    style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize:"cover",
        backgroundPosition:"center",
    }}>
        <div className='banner_contents'>
            <div className='banner_title'>
                {movie?.title||movie?.name||movie?.originalName}
            </div>
            <div className='banner_buttons'>
                <button className='banner_button'>Play</button>
                <button className='banner_button'>My List</button>
            </div>
            <div className='movie_desc'>
                {trucate(movie?.overview,160)}
            </div>
        </div>
        <div className='fade_bottom'/>
    </header>
  )
}

export default Banner