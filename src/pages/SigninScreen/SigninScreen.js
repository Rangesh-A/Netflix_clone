import React from 'react'
import './SigninScreen.css'
import { useState } from 'react';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase';
import { doc, setDoc,collection} from "firebase/firestore"; 
import { db } from '../../firebase';
const SigninScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(false);
  const [errmsg,setErrMsg]=useState("");

  const register=(e)=>{
    e.preventDefault();

    createUserWithEmailAndPassword(auth,email,password)
    .then((authUser)=>{
      createUser();
        // console.log(authUser);
    })
    .catch((err)=>{
      // alert(err.message);
      setError(true);
      setErrMsg("User Already Exists Please do Sign in");
    })
  }

  const createUser= async() =>{
    const newCityRef = doc(collection(db, "Users"));
    await setDoc(newCityRef, {
        email: email,
        basic_plan:false,
        standard_plan:false,
        premium_plan: false
      });
  }

  const signin=(e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth,email,password)
    .then((authUser)=>{
        console.log(authUser);
    })
    .catch((err)=>{
      // alert(err.message);
      setError(true);
      setErrMsg("Incorrect Email or Password");
    })
  }

  return (
    <div className='signinscreen'>
      <h1>Sign In</h1>
      <form className='signin'>
        <input  value={email} placeholder='Email' type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input value={password} placeholder='Password' type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit" onClick={signin}>Sign In</button>
        {error && <h5>{errmsg}</h5>}
        <h1>
          <span className='signin_grey'> New to Netflix? </span><span className='signin_link' onClick={register}>Sign Up Now</span>
        </h1>
      </form>
    </div>
  )
}

export default SigninScreen