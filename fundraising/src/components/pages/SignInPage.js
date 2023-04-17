import Header1 from '../headers/Header1';
import login from '../images/login.png';
import '../style/SignInPage.css';
import React, { Component } from 'react';

class SignIn extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
    };
  }

  handleLogin = async (event) => {
    event.preventDefault();

    const loginUserEmail = this.loginEmail.value;
    const loginUserPassword = this.loginPassword.value;

    if (await this.props.loginUser(loginUserEmail, loginUserPassword)) {
        this.setState({ loginError: false });
      } else {
        this.setState({ loginError: true });
        setTimeout(() => {
          this.setState({ errorMessage: 'Invalid email or password. Please try again.' });
        }, 500);
      }
  };

  handleTogglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
     // Toggle password
    return (
      <div className='signin-body'>
        <main className='signin-page'>
          <section className='signin'>
            <div className='signin-header'>
              <h2>Sign in to FundChain</h2>
            </div>
            <div className='forum-main'>
              <div className='forum-img'>
                <img src={login} className='login-img' />
              </div>
              <div className='forum-content'>
                <form className='forum-content' onSubmit={this.handleLogin}>
                  <div className='forum-content'>
                        <i className='fa-solid fa-envelope' id='email-icon'></i>
                        <i className='fa-solid fa-key' id='password-icon'></i>
                        <i className='fa-regular fa-eye' id='toggle-password'></i>
                        <a href="javascript:void(0)" onClick={this.handleTogglePassword}>
                          <i className={`fa-regular ${this.state.showPassword ? 'fa-eye' : 'fa-eye-slash'}`} id='eye-icon'></i>
                        </a>
                    <input
                      id='loginEmail'
                      type='text'
                      ref={(input) => {
                        this.loginEmail = input;
                      }}
                      className='email'
                      placeholder='email'
                      pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          'Please enter a valid email address'
                        );
                      }}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                    <input
                      id='loginPassword'
                      type={this.state.showPassword ? 'text' : 'password'}
                      ref={(input) => {
                        this.loginPassword = input;
                      }}
                      className='password'
                      placeholder='password'
                      required
                    />
                  </div>
                  {this.state.loginError && (
                    <div className='login-error'>
                        {this.state.errorMessage}
                    </div>
                    )}
                  <button type='submit' className='signin--button'>
                    SIGN IN
                  </button>
                </form>

                <div className='signup-option'>
                  <span>Do not have an account?</span>
                  <a href='/signup'>Sign up</a>
                </div>
    
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default SignIn;
