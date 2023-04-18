import '../style/MyAccountPage.css'
import Avatar1 from '../images/user-avatar.png'
import React, { Component } from 'react';
import ProjectsPage from '../pages/ProjectsPage.js'


function Dashboard(props) {
    return (
        <div className='section--third'>
                    <div className='donations--section'>
                        <div>
                            <h5>DONATIONS</h5>
                            <span>{props.currentAccountData.numDonations}</span>
                        </div>
                        <div>
                            <h5>TOTAL DONATION AMOUNT</h5>
                            <span>{props.currentAccountData.totalDonationsFunded / 10 ** 18} ETH</span> {/* // show in ethers */}
                        </div>
                    </div>
                    <div className='projects--section'>
                        <div>
                            <h5>PROJECTS</h5>
                            <span>{props.currentAccountData.numProjects}</span>
                        </div>
                        <div>
                            <h5>TOTAL DONATION RECEIVED</h5>
                            <span>{props.currentAccountData.totalDonationsReceived / 10 ** 18} ETH</span> {/* // show in ethers */}
                        </div>
                    </div>
        </div>
    )
}


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
                        <h5>My Wallet</h5>
                        <div className='wallet--info'>
                            <h6>{this.props.currentAccountData.name} {this.props.currentAccountData.surname}</h6>
                            <span><p>Balance:</p> {Number(this.props.balance).toFixed(4)} ETH</span> {/* // show until 4 decimal places  */} 
                        </div>
                    </div>
                    <div className='account--row'>
                        <h5>My Account</h5>
                        <div className='account--info'>
                            <span className='user--email'>{this.props.currentAccountData.email}</span>
                            <a href="#">Edit profile<i class="fa-solid fa-pencil" id="edit--icon"></i></a>
                        </div> 
                    </div>
                    <div className='wallet--address'>
                        <p>My wallet address:</p>
                        <span>{this.props.account}</span>
                    </div>  
                </div>
                <div className='section--second'>
                    <a href=""><span id="dashboard--button">Dashboard</span></a>
                    <a href=""><span id="projects--button">My projects</span></a>
                </div>
                <Dashboard currentAccountData={this.props.currentAccountData} />
                {/* <ProjectsPage /> */}
            </div>
        </main>
    )
    }
}

export default MyAccount;