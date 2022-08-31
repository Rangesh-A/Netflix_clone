import React, { useEffect } from 'react'
import './Nav.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
    const [show, setShow] = useState(false)

    const trans=()=>{
        if(window.scrollY>100){
            setShow(true)
        }else{
            setShow(false)
        }
    }
    useEffect(()=>{
        window.addEventListener("scroll",trans);
        return()=>window.removeEventListener("scroll",trans)
    },[])
  return (
    <nav className={`nav ${show && "navblack"}`}>
        <div className='nav_contents'>
            <Link to="/">
                <img src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt=''  className='logo'/>
            </Link>
            <Link to="/profile">
                <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' className='avatar' />
            </Link>
        </div>
    </nav>
  )
}

export default Nav