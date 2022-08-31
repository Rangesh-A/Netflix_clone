import React,{useState,useEffect} from 'react'
import './OTP.css'
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../firebase';
import { doc,updateDoc } from 'firebase/firestore'
import { db } from '../../firebase';

const OTP = (props) => {

    const [otpIsActive, setotpIsActive] = useState(false)
    const [phone_number,setPhoneNumber] = useState("+91");
    const [otp,setOtp] = useState("");
    const [btnMsg,setBtnMsg] = useState("Send OTP");
    const [otpSent,setOtpSent] = useState(false);
    const [err,setErr] = useState(false);
    const [resend,setResend] = useState(false);
    const [errMsg,setErrMsg] = useState("");
    

    const generateRecaptcha=()=>{
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
        'size': 'invisible',
        'callback': (response) => {
          
        }
      }, auth);
    }
    const requestOTP=(e)=>{
      e.preventDefault(); 
      if(phone_number.length>=13&&phone_number.length!==0&&phone_number.charAt(0)!==0){
        setErr(false);
        generateRecaptcha();
        let appVerifier=window.recaptchaVerifier;
        signInWithPhoneNumber(auth,phone_number,appVerifier)
        .then(confirmationResult=>{
          window.confirmationResult=confirmationResult;
          setotpIsActive(true);
          setOtpSent(true);
          setBtnMsg("Verify OTP")
        }).catch((error)=>{
          console.log(error);
          setErrMsg("Please try again later");
          setErr(true);
        })
      }else{
        setErrMsg("Enter valid mobile number");
        setErr(true);
      }
    }
    const toggleOTPTab=()=>{
      props.toggleOTP(false);
  }

  const changePlan=async()=>{
    const userDoc=doc(db,"Users",props.userId);
            if(props.plan_name==="Basic Plan"){
                const newFields={basic_plan:true,premium_plan:false,standard_plan:false};
                await updateDoc(userDoc,newFields);
            }
            if(props.plan_name==="Standard Plan"){
                const newFields={standard_plan:true,basic_plan:false,premium_plan:false};
            await updateDoc(userDoc,newFields);

            }
            if(props.plan_name==="Premium Plan"){
                const newFields={premium_plan:true,basic_plan:false,standard_plan:false};
                await updateDoc(userDoc,newFields);
            }
  }

  const verifyOtp=(e)=>{
    setOtp(e.target.value);
    if(otp.length===6){
      console.log(otp);
      let confirmationResult=window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        props.toggleOTP(false);
        changePlan();
        window.location.href = '/profile/SubscriptionSuccess';
        // console.log('success');
      }).catch((error) => {
        console.log("error")
        setErrMsg("Invalid OTP");
        setResend(true);
        setErr(true);
      });
    }
  }
  return (
    <div className='otpscreen'>
      <div id='recaptcha' className='recap'></div>
      <h1 className='close_sym' onClick={toggleOTPTab}>X</h1>
      <div className='otp_cont'>
        <h1>Plan Activation</h1>
        <form className='otp'>
          <label>Phone number</label>
          <input  value={phone_number} placeholder='Mobile Number' type="text" required='required' onChange={(e)=>{
            setPhoneNumber(e.target.value)
          }}/>
          
          {otpIsActive&&
              <div className='otp'>
                  <label>OTP</label>
                  <input  placeholder='OTP' type="text" required='required' onChange={(e)=>{
            setOtp(e.target.value)}}/>
                  <h5>Please enter one time pin sent to your phone</h5>
              </div>
          }
          {err&&<span className='err'>{errMsg}</span>}
          {otpSent&&<span className='otpsent'>OTP has sent to your mobile</span>}
          {resend&&<div className='resend_msg'><span>OTP doesn't work?</span><span className='resend_link' onClick={requestOTP}>resend otp</span></div>}
          <button type="submit" onClick={otpSent===false?requestOTP:verifyOtp}>{btnMsg}</button>
        </form>
      </div>
    </div>
  )
}

export default OTP