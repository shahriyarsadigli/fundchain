import Header1 from '../headers/Header1.js'
import login from '../images/login.png'
import '../style/SignUpPage.css'
import React from 'react';

export default function SignUp() {
    return (
        <div className='signup-body'>
            <Header1 />
            <main className='signup-page'>
                <section className='signup'>
                    <div className='forum-header'>
                        <h2>Sign up to FundChain</h2>
                    </div>
                    <div className="forum-main">
                        <div className="forum-img">
                            <img src={login} className="login-img"/>
                        </div>
                        <div className="forum-content">
                            <div className='personal-info'>     
                                <input type="text" className="signup-name" placeholder="Name" size="14"></input>
                                <input type="password" className="signup-lname" placeholder="Lastname" size ="14"></input>
                            </div>
                            <div className='signup-info'>
                                <input type="text" className="email" placeholder="Email"></input>
                                <input type="password" className="password" placeholder="Password"></input>
                            </div>
                            <button type="button" className="signin-button"><a href="">SIGN UP</a></button>
                            <div className="signin-option">
                                <span>Already have an acoount?</span>
                                <a href="/signin">Sign in</a>
                            </div>
                            <i class="fa-solid fa-envelope" id="email-icon-2"></i>
                            <i class="fa-solid fa-key" id="password-icon-2"></i>
                            <a href="#"><i class="fa-regular fa-eye-slash" id="eye-icon-2"></i></a>
                            <i class="fa-regular fa-user" id="user-icon-1"></i>
                            <i class="fa-regular fa-user" id="user-icon-2"></i>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
