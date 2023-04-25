import '../style/AProjectPage.css'
import React, { Component, useState } from 'react';
import { fromWei } from 'web3-utils';



function getCategoryName(category) {
  // categories with their values
    switch (category) {
      case '0':
        return 'Other';
      case '1':
        return 'Technology';
      case '2':
        return 'Healthcare';
      case '3':
        return 'Environment';
      case '4':
        return 'Education';
      case '5':
        return 'Art';
      default:
        return 'Unknown';
    }
  }

class AProject extends Component {
    
    // Donation bar
    constructor(props) {
        super(props);
        this.state = {
            percentageRaised: 0
        };
    }


    componentDidMount() {
        const donationTarget = fromWei(this.props.project.targetAmount);
        const amountRaised = fromWei(this.props.project.amountRaised);
        const percentageRaised = Math.floor((amountRaised / donationTarget) * 100); // percentage of the raised amount
        this.setState({ percentageRaised });
    }

    // Delete Project 
    handleDeleteIconClick = () => {
        this.setState((prevState) => ({
          showDeleteButton: !prevState.showDeleteButton 
        }));
      };

    render() {

    // import the images from project_images folder
    const images = require.context('../images/project_images', true);
    const { project } = this.props
    return (
        <main className='project--main'>
            <div className='project--body '>
                <div className='project--header'>
                    <div className='project-name-badge'>
                        <img src={images(`./${project.imagePath}`)} alt="" />
                        <div className='project-name-info'>
                            <div className="project-name-verified">
                                <i class="fa-solid fa-circle-check"></i>
                                <span>VERIFIED</span>
                            </div>
                            <h3>{project.title}</h3>
                            <span>{project.ownerData.name} {project.ownerData.surname}</span>
                        </div>
                    </div>
                    <div className='project-funds-info'>
                        <p>{project.excerpt}</p>
                        <div className='project-funds-raised'>
                            <span>TOTAL FUNDS RAISED:</span>
                            <span className='project-funds-amount'>{project.amountRaised / 10**18} ETH</span>
                        </div>
                        <div className='project-funds-target'>
                            <span>TOTAL TARGET AMOUNT:</span>
                            <span className='project-funds-amount'>{fromWei(project.targetAmount, 'ether')} ETH</span>
                        </div>
                        
                    </div>
                </div>
                <div className='project--content'>
                    <div className='project--description'>
                        <p> {project.body} </p>
                    </div>
                    <div className='project--donation'>
                        <h4>{project.title}
                            <i onClick={this.handleDeleteIconClick} class="fa-regular fa-trash-can"></i>
                        </h4>
                        <div className='project--donation--bar'>
                            <span className='project--donation--progress' style={{width: `${this.state.percentageRaised}%`}}></span>
                            <h6>{this.state.percentageRaised}%</h6>
                        </div>
                        <div className='project--donation--button'>
                            { 
                            this.props.userAuthenticated === true ?
                            <a href={`/donation/${project.slug}`} onClick={(e) => {
                              if (this.props.account === project.creator) {
                                e.preventDefault();
                                alert("You cannot donate your own project...");
                              }
                            }}>DONATE</a>
                            :
                            <a href={`/signin`} onClick={(e) => { e.preventDefault();
                            alert("You need to be logged in to donate a project"); 
                            window.location.href = "/signin"; }}>DONATE</a>
                            }
                        </div>
                        <div className='project--donation--category'>
                            {getCategoryName(project.category)}
                        </div>
                        
                        <div className='project--delete'>
                        {
                           this.props.userAuthenticated && project.creator === this.props.account && project.amountRaised < project.targetAmount / 20
                           ? 
                          <button
                            style={{ display: this.state.showDeleteButton ? "block" : "none" }}
                            name={project.id}
                            onClick={(event) => {
                                this.props.deleteProject(event.target.name);
                            }}
                          >
                            Delete Project
                          </button> 
                          : null
                        }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
    }
}

export default AProject;