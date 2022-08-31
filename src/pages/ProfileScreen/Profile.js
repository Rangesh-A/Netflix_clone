import { signOut } from 'firebase/auth'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import Nav from '../../components/Nav/Nav'
import { selectUser } from '../../features/userSlice'
import {auth} from '../../firebase'
import Plan from '../plan/Plan'
import { collection, onSnapshot, query,snapshotEqual,where } from 'firebase/firestore'
import { db } from '../../firebase'
import './Profile.css'
import OTP from '../OTPPage/OTP'

const Profile = () => {
  const user =useSelector(selectUser);

  const [BasicPlan, setBasicPlan] = useState(false);
  const [StandardPlan, setStandardPlan] = useState(false);
  const [PremiumPlan, setPremiumPlan] = useState(false);
  const [userId,setUserId]=useState("");
  const [newPlan,setNewPlan]=useState("");
  

  const [otpIsActive, setotpIsActive] = useState(false);

  const logOut=()=>{
    signOut(auth);
  }

  useEffect(() => {
    const colref=collection(db,'Users');

    const q=query(colref, where("email","==",user.email));

    onSnapshot(q,(snapshot)=>{
      let targetUser = [ ]
      snapshot.docs.forEach ( ( doc )=>{
        targetUser.push ( { ... doc.data ( ) , id : doc.id } )
      } )
      setBasicPlan(targetUser[0].basic_plan);
      setStandardPlan(targetUser[0].standard_plan);
      setPremiumPlan(targetUser[0].premium_plan);
      setUserId(targetUser[0].id);
    })

  }, [])
  

  return (
    <div className='profile'>
{/* Same as */}
      <Nav />
      {otpIsActive&&
        <OTP toggleOTP={flag=>setotpIsActive(flag)} userId={userId} plan_name={newPlan}/>
      }
      <div className='profile_box'>
          <div className='title'>
            <h1>Edit Profile</h1>
          </div>
          <div className='account_info'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt=''></img>
            <div className='screen_details'>
              <h2>{user.email}</h2>
              <h3>Plans</h3>
              <Plan plan_name="Premium Plan" clearity="4K + HDR" isActive={PremiumPlan} userId={userId} 
              toggleOTP={flag=>setotpIsActive(flag) } changePlan={plan_name=>setNewPlan(plan_name)}
              />
              <Plan plan_name="Standard Plan" clearity="1080P" isActive={StandardPlan} userId={userId}
              toggleOTP={flag=>setotpIsActive(flag)} changePlan={plan_name=>setNewPlan(plan_name)}
              />
              <Plan plan_name="Basic Plan" clearity="720P" isActive={BasicPlan} userId={userId}
              toggleOTP={flag=>setotpIsActive(flag)} changePlan={plan_name=>setNewPlan(plan_name)}
              />
              <button className='signout_btn' onClick={logOut} >Sign Out</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Profile