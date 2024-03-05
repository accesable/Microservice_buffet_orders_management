import React, { useState } from 'react';
import './LoginPage.css';
import user_icon from "./Assets/person.png";
import password_icon from "./Assets/password.png";
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
    };

    return (
        <div className='login'>
        <div className='my-container'>
            <div className='header'>
                <div className='text'>Employee Login</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                </div>
            </div>
            <div className="submit-container">
                {/* <div className="submit">Sign Up</div> */}
                <div className="submit" onClick={handleSubmit}>Login</div>
            </div>
        </div>
        </div>

    );
};

export default LoginPage;