import '../LoginSignup/LoginSignup.css'
import React, {useCallback, useState} from "react";

import user_icon from '../../Assets/person.png'
import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import punct_icon from '../../Assets/punct.png'
import ambulance_icon from '../../Assets/ambulance.png'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    
    const [action,setAction] = useState("SignUp");
    const navigate = useNavigate()

    const handleLogin = useCallback(() => {
        navigate('/')  
    })


    return (
      <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="placeholder">
            <img src={punct_icon} alt="" />
        </div>
        <div className="ambulanta">
            <img src={ambulance_icon} alt="" />
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>: <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" id="email" placeholder='E-mail'/>
            </div>}
           
            <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" id = "user" placeholder='Username'/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" id="pass" placeholder='Password'/>
            </div>
        </div>
        {action==="Sign Up"?<div></div>: <div className="forgot-password">Lost Password? <span>Click here!</span></div>}
        <div className="submit-container">
            <button className={action==="Login"?"submit gray":"submit"} onClick={async ()=>{
                const username = document.getElementById('user').value;
                const password = document.getElementById('pass').value; 
                const email = document.getElementById('email').value;
                const result = await fetch('http://localhost:3000/signUserUp?username='+username+'&password='+password+'&email='+email+'&privilege=US');
                handleLogin();
            }}>Sign Up</button>
            <button className={action==="Sign Up"? "submit gray":"submit"} onClick={async () => {
                        handleLogin();
                }}>Login</button>
        </div>
      </div>
  )
}

export default SignUp
