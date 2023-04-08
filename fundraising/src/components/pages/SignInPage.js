import Header1 from '../headers/Header1'
import login from '../images/login.png'
import '../style/SignInPage.css'
import React, { Component } from 'react';


class SignIn extends Component {

    handleLogin = (event) => {
        event.preventDefault();
        
        const loginUserEmail = this.loginEmail.value
        const loginUserPassword = this.loginPassword.value
    
        this.props.loginUser(loginUserEmail, loginUserPassword)
    }
      // fix the handleLogin to make sure that users can log into their accounts
      
    render () {
    return (
        <div className='signin-body'>
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
                                <form className="forum-content" onSubmit={this.handleLogin}>
                                <div className="forum-content">
                                    <input
                                    id="loginEmail"
                                    type="text"
                                    ref={(input) => { this.loginEmail = input }}
                                    className="email"
                                    placeholder="email"
                                    required 
                                    />
                                    <input
                                    id="loginPassword"
                                    type="password"
                                    ref={(input) => { this.loginPassword = input }}
                                    className="password"
                                    placeholder="password"
                                    required 
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="signin-button"
                                >SIGN IN</button>
                                </form>

                            <div className="signup-option">
                                <span>Do not have an account?</span>
                                <a href="/signup">Sign up</a>
                            </div>
                            <i className="fa-solid fa-envelope" id="email-icon"></i>
                            <i className="fa-solid fa-key" id="password-icon"></i>
                            <a href="#"><i className="fa-regular fa-eye-slash" id="eye-icon"></i></a>
                            

                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
    }
}

export default SignIn;