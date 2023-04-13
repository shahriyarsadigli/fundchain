import Header1 from '../headers/Header1.js'
import login from '../images/login.png'
import '../style/SignUpPage.css'
import React, { Component } from 'react';

class SignUp extends Component {

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
    
      validateEmail = () => {
        const email = this.userEmail.value;
        if (!this.isValidEmail(email)) {
          const errorMessage = "Invalid email address";
          this.emailError.textContent = errorMessage;
        }
        else {
          this.emailError.textContent = "";
        }
        const emailValid = this.isValidEmail(email);
        this.setState({ emailValid });
      }

    handleSubmit = (event) => {
        event.preventDefault(); // prevent the default form submission behavior
    
        const email = this.userEmail.value;
        if (!this.isValidEmail(email)) {
          return; // don't continue submitting the form
        }
        else {
          const name = this.userName.value
          const surname = this.userSurname.value
          const username = this.userUsername.value
          const email = this.userEmail.value
          const password = this.userPassword.value // get password value from field
    
          
          this.props.createUser(name, surname, username, email, password)
    
        }
      };

    render() {
    return (
        <div className='signup-body'>
            <main className='signup-page'>
                <section className='signup' >
                <form onSubmit={this.handleSubmit}>


                    <div className='forum-header'>
                        <h2>Sign up to FundChain</h2>
                    </div>
                    <div className="forum-main">
                        <div className="forum-img">
                            <img src={login} className="login-img"/>
                        </div>
                        <div className="forum-content">
                            <div className='personal-info'>     
                                <input
                                    id="userName"
                                    type="text"
                                    ref={(input) => { this.userName = input }}
                                    className="signup-name"
                                    placeholder="Name"
                                    size="14"
                                    pattern="[A-Za-z]+"
                                    onInvalid={(e) => {e.target.setCustomValidity("Please enter only letters for the name")}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required />
                                <input
                                    id="userSurname"
                                    type="text"
                                    ref={(input) => { this.userSurname = input }}
                                    className="signup-lname"
                                    placeholder="Surname"
                                    size="14"
                                    pattern="[A-Za-z]+"
                                    onInvalid={(e) => {e.target.setCustomValidity("Please enter only letters for the surname")}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required />
                                <input
                                    id="userUsername"
                                    type="text"
                                    ref={(input) => { this.userUsername = input }}
                                    className="signup-lname"
                                    placeholder="Username"
                                    size="14"
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                                    onInvalid={(e) => {e.target.setCustomValidity("Username must be at least 6 characters and include both and only letters and numbers")}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required />                            
                                </div>
                            <div className='signup-info'>
                                <input
                                    id="userEmail"
                                    type="text"
                                    ref={(input) => { this.userEmail = input }}
                                    className="email" 
                                    placeholder="Email"
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    onInvalid={(e) => {e.target.setCustomValidity("Please enter a valid email address")}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required 
                                    />

                                <input
                                    id="userPassword"
                                    type="password"
                                    ref={(input) => { this.userPassword = input }}
                                    className="password" 
                                    placeholder="Password"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                    onInvalid={(e) => {e.target.setCustomValidity("Please enter at least one lowercase letter, one uppercase letter, one number, and a minimum length of 8 characters")}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required 
                                />

                            </div>
                            <button type="submit" className="signin-button">SIGN UP</button>


                            <div className="signin-option">
                                <span>Already have an account?</span>
                                <a href="/signin">Sign in</a>
                            </div>
                            <i className="fa-solid fa-envelope" id="email-icon-2"></i>
                            <i className="fa-solid fa-key" id="password-icon-2"></i>
                            <a href="#"><i className="fa-regular fa-eye-slash" id="eye-icon-2"></i></a>
                            <i className="fa-regular fa-user" id="user-icon-1"></i>
                            <i className="fa-regular fa-user" id="user-icon-2"></i>
                            <i className="fa-solid fa-user" id="username-icon"></i>
                        </div>
                        
                    </div>
                </form>


                </section>
            </main>
        </div>
    )
    }
}

export default SignUp;