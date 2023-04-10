import '../style/MyAccountPage.css'
import Avatar1 from '../images/user-avatar.png'
import React, { Component } from 'react';

class MyAccount extends Component {
    render() {
    return (
        <main className='account--main'>
            <div className='account--section'>
                <div className='section--first'>
                    <div className='img--row'>
                        <img src={Avatar1} className="user--avatar"/>
                        <span className='user--name'>{this.props.currentAccountData.name} {this.props.currentAccountData.surname}</span>
                    </div>
                    <div className='wallet--row'>
                        <h3>My Wallet</h3>
                        <button type="button" className="account-button">
                                <span>{this.props.currentAccountData.name} {this.props.currentAccountData.surname}</span>
                                <a><span>{Number(this.props.balance).toFixed(5)} ETH</span></a> {/* // show until 5 decimal places  */}
                        </button> 
                    </div>
                    <div className='account--row'>
                        <h3>My Account</h3>
                        <span className='user--email'>{this.props.currentAccountData.email}</span>
                        <a href="#"><span className='edit--profile'>Edit profile</span></a>
                        <i class="fa-solid fa-pencil" id="edit--icon"></i>
                    </div>
                    <div className='wallet--address'>
                        <p>My wallet address:</p>
                        <span>{this.props.account}</span>
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
}

export default MyAccount;