import '../style/MyAccountPage.css'
import Avatar1 from '../images/user-avatar.png'
import React, { Component } from 'react';
import ProjectCard from '../headers/ProjectCard.js'


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

    state = {
        showProjects: false
      };

      handleProjectsClick = (event) => {
        event.preventDefault();
        this.setState({ showProjects: true });
      }

      handleDashboardClick = (event) => {
        event.preventDefault();
        this.setState({ showProjects: false });
      }
      

    render() {

        const cards = this.props.projects.map(project => {
            if (project.id != 0 && project.creator === this.props.currentAccountData.userAddress) // load only the projects which are created by this user
              return (
                <ProjectCard
                  id={project.id}
                  project={project}
                />
              );
          });

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
                    <a onClick={this.handleDashboardClick}><span id="dashboard--button">Dashboard</span></a>
                    <a onClick={this.handleProjectsClick}><span id="projects--button">My projects</span></a>
                </div>
                {!this.state.showProjects && <Dashboard currentAccountData={this.props.currentAccountData} />}
                {this.state.showProjects && <div className="projects-list">{cards}</div>}
            </div>
        </main>
    )
    }
}

export default MyAccount;