import React from 'react'
import './LoginScreen.css'
import { useState } from 'react'
import SigninScreen from '../SigninScreen/SigninScreen';
const LoginScreen = () => {
    const [signin, setSignin] = useState(false);
  return (
      <div className='loginscreen'>
        <div className='loginscreen_bg'>
            <img  className="loginscreen_img" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
        </div>
        <div className='gradient' />
        <button className='signin_btn' onClick={()=>setSignin(true)}>Sign in</button>
        <div className='login_body'>
            {
                signin?(
                    <SigninScreen />
                ):(
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your 
                            membership.</h3>
                        <div className='loginscreen_inputs'>
                            <form>
                                <input type="email" placeholder='Email Address' />
                                <button className='getstart' onClick={()=>setSignin(true)}>GET STARTED</button>
                            </form>
                        </div>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default LoginScreen