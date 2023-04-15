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
                    </div>
                    <div className='wallet--row'>
                        <h3>My Wallet</h3>
                        <button type="button" className="account-button">
                                <span>{this.props.currentAccountData.name} {this.props.currentAccountData.surname}</span>
                                <a><span>{Number(this.props.balance).toFixed(4)} ETH</span></a> {/* // show until 4 decimal places  */}
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
                    <a href=""><span id="projects--button">My projects</span></a>
                </div>
                <div className='section--third'>
                    <div className='donations--section'>
                        <div>
                            <h5>DONATIONS</h5>
                            <span>{this.props.currentAccountData.numDonations}</span>
                        </div>
                        <div>
                            <h5>TOTAL DONATION AMOUNT</h5>
                            <span>{this.props.currentAccountData.totalDonationsFunded / 10 ** 18} ETH</span> {/* // show in ethers */}
                        </div>
                    </div>
                    <div className='projects--section'>
                        <div>
                            <h5>PROJECTS</h5>
                            <span>{this.props.currentAccountData.numProjects}</span>
                        </div>
                        <div>
                            <h5>TOTAL DONATION RECEIVED</h5>
                            <span>{this.props.currentAccountData.totalDonationsReceived / 10 ** 18} ETH</span> {/* // show in ethers */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
    }
}

export default MyAccount;