import React from 'react'
import './SubscriptionSuccess.css'
import {useNavigate} from 'react-router-dom'
import { selectUser } from '../../features/userSlice'
import { useSelector } from 'react-redux'


const SubscriptionSuccess = () => {

  const user =useSelector(selectUser);

    const navigate = useNavigate();
    const backtoProfile=()=>{
        // navigate('/');
        window.location.href = '/';
    }
  return (
    <div className='success_page'>
        <div class="box">
            <img  className='popcorn' src="https://i.pinimg.com/originals/e0/19/4e/e0194edf48a2ddac0ddf123606bb85d6.jpg"></img>
            <img className='tick' src='https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png'/>
            <h1>Thank You </h1>
            <p>Your subscription has been confirmed.You can enjoy the subscription benefits in this email id ({user.email})</p>
            <button className='back_btn' onClick={backtoProfile}>Start Watching</button>
        </div>
        <div class="pyro">
                <div class="before"></div>
                <div class="after"></div>
        </div>
    </div>
  )
}

export default SubscriptionSuccess