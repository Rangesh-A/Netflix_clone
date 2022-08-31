import React from 'react'
import './Plan.css'
import { db } from '../../firebase'
import { doc,updateDoc } from 'firebase/firestore'
import OTP from '../OTPPage/OTP'

const Plan = (props) => {

    const userId=props.userId;

    const toggleOTPTab=()=>{
        props.toggleOTP(true);
    }
    const changePlan = async()=>{
        toggleOTPTab();
        props.changePlan(props.plan_name);
    };

  return (
    <div className='plan'>
        <div className='plan_title'>
            <h4>{props.plan_name}</h4>
            <h5>{props.clearity}</h5>
        </div>
        {props.isActive&&
        <button className='active_buttn'>Current Plan</button>
        ||
        <button className='subs_buttn' onClick={changePlan}>Subscribe</button>
        }   
    </div>
  )
}

export default Plan