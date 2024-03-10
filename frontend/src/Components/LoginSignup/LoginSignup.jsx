import React, { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Import CSS if the path is correct
import '../LoginSignup/LoginSignup.css';

// Import your icons
import user_icon from '../../Assets/person.png';
import email_icon from '../../Assets/email.png';
import password_icon from '../../Assets/password.png';
import punct_icon from '../../Assets/punct.png';
import ambulance_icon from '../../Assets/ambulance.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const navigate = useNavigate();

    const handleLogin = useCallback(() => {
        navigate('/map');
    }, [navigate]);

    const handleLogin2 = useCallback(() => {
        navigate('/mapAmbulance');
    }, [navigate]);

    const handleSignUp = useCallback(() => {
        navigate('/SignUp');
    }, [navigate]);

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
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Name' />
                    </div>
                )}

                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" id="user" placeholder='Username' />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" id="pass" placeholder='Password' />
                </div>
            </div>
            {action === "Sign Up" ? null : (
                <div className="forgot-password">Lost Password? <span>Click here!</span></div>
            )}
            <div className="submit-container">
                <button className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUp}>Sign Up</button>
                <button className={action === "Sign Up" ? "submit gray" : "submit"} onClick={async () => {
                    const password = document.getElementById('pass').value;
                    const username = document.getElementById('user').value;
                        const result = await fetch(`http://localhost:3000/getPassword?username=${username}`);
                            const data = await result.json();

                                const vec = data.password;
                                console.log(vec);
                                const pas = vec[0].password;
                                const priv = vec[1].privilege;
                        
                                if (pas === password && priv === "US")
                                    handleLogin();
                                else if (pas === password && priv === "EM")
                                    handleLogin2();
                }}>Login</button>
            </div>
        </div>
    )
}

export default LoginSignup;
