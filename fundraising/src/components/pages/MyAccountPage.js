import Header2 from '../headers/Header2.js'
import '../style/MyAccountPage.css'
import Avatar1 from '../images/user-avatar.png'
import React from 'react';

export default function MyAccount() {
    return (
        <main className='account--main'>
            <Header2 />
            <div className='account--section'>
                <div className='section--first'>
                    <div className='img--row'>
                        <img src={Avatar1} className="user--avatar"/>
                        <span className='user--name'>Shahriyar Sadigli</span>
                    </div>
                    <div className='wallet--row'>
                        <h3>My Wallet</h3>
                        <button type="button" className="account-button">
                                <span>Shahriyar Sadigli</span>
                                <a href="#">2.000 ETH</a>
                        </button> 
                    </div>
                    <div className='account--row'>
                        <h3>My Account</h3>
                        <span className='user--email'>shahriyarsadigli@gmail.com</span>
                        <a href="#"><span className='edit--profile'>Edit profile</span></a>
                        <i class="fa-solid fa-pencil" id="edit--icon"></i>
                    </div>
                    <div className='wallet--address'>
                        <p>Wallet address:</p>
                        <span>0x647862d87995eda2061dbe8740f07f33dd0bcc4c</span>
                    </div>
                    <div className="eth--icon">
                        <i class="fa-brands fa-ethereum" id="et-icon"></i>
                    </div>
                    
                </div>
                <div className='section--second'>
                    <a href=""><span id="dashboard--button">Dashboard</span></a>
                    <a href=""><span id="donations--button">My donations</span></a>
                    <a href=""><span id="projects--button">My projects</span></a>
                </div>
                <div className='section--third'>
                    <div className='donations--section'>
                        <div>
                            <h5>DONATIONS</h5>
                            <span>0</span>
                        </div>
                        <div>
                            <h5>TOTAL DONATION AMOUNT</h5>
                            <span>0</span>
                        </div>
                    </div>
                    <div className='projects--section'>
                        <div>
                            <h5>PROJECTS</h5>
                            <span>0</span>
                        </div>
                        <div>
                            <h5>TOTAL DONATION RECEIVED</h5>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}