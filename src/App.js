import React,{useEffect,useState} from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen/HomeScreen';
import Profile from './pages/ProfileScreen/Profile';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import { login, logout, selectUser } from './features/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SplashScreen from './SplashScreen/SplashScreen';
import SubscriptionSuccess from './pages/SubscriptionPage/SubscriptionSuccess';
const App = () => {
  const user=useSelector(selectUser);

  const dispatch=useDispatch();

  const [splashScreen, setsplashScreen] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setsplashScreen(false);
      console.log("hello");
      clearInterval(interval);
    }, 4600);

    const unsubscribe=onAuthStateChanged(auth,(userAuth)=>{
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email
        })
        );
      }
      else{
        dispatch(logout());
      }
  });
  return unsubscribe;
  }, [])
  
  console.log(user);
  return (
    <div className='app'>

    {splashScreen&&<SplashScreen />}
      <Router>
        {
          !user?(
            <LoginScreen />
          ):(
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile/SubscriptionSuccess" element={<SubscriptionSuccess />} />
          </Routes>
        )}
      </Router>
    </div>
  )
}

export default App