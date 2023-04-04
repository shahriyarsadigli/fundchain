import Header1 from '../headers/Header1'
import login from '../images/login.png'
import '../style/SignInPage.css'
import React from 'react';


export default function SignIn() {
    return (
        <div className='signin-body'>
            <Header1 />
            <main className='signin-page'>
                <section className='signin'>
                    <div className='forum-header'>
                        <h2>Sign in to FundChain</h2>
                    </div>
                    <div className="forum-main">
                        <div className="forum-img">
                            <img src={login} className="login-img"/>
                        </div>
                        <div className="forum-content">
                            <input type="text" className="email" placeholder="Email"></input>
                            <input type="password" className="password" placeholder="Password"></input>
                            <button type="button" className="signin-button"><a href="">SIGN IN</a></button>
                            <div className="register-options">
                                <hr></hr>
                                <h6>OR</h6>
                                <hr></hr>
                            </div>
                            <button type="button" className="signin-button-eth"><a href="/metamask">Sign in with Ethereum</a></button>
                            <div className="signup-option">
                                <span>Do not have an acoount?</span>
                                <a href="/signup">Sign up</a>
                            </div>
                            <i class="fa-brands fa-ethereum" id="eth-icon"></i>
                            <i class="fa-solid fa-envelope" id="email-icon"></i>
                            <i class="fa-solid fa-key" id="password-icon"></i>
                            <a href="#"><i class="fa-regular fa-eye-slash" id="eye-icon"></i></a>
                            

                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}