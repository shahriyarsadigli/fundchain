import '../style/AProjectPage.css'
import bg from '../images/project-wallpaper.jpg'
import Pimg8 from '../images/project8.jpg'
import React, { Component } from 'react';

class AProject extends Component {
    render() {
    return (
        <main className='project--main'>
            <div className='project--body '>
                <div className='project--header'>
                    <img src={bg} className='project--bg'/>
                    <div className='project-name-badge'>
                        <div className='project-name-img'>
                            <img src={Pimg8}/>
                        </div>
                        <div className='project-name-info'>
                            <div className="project-name-verified">
                                <i class="fa-solid fa-circle-check"></i>
                                <span>VERIFIED</span>
                            </div>
                            <h2>{this.props.project.title}</h2>

                            <span>Project creator address: {this.props.project.creator}</span>
                        </div>
                    </div>
                </div>
                <div className='project--d-info'>
                    <h3>TOTAL FUNDS RECEIVED:</h3>
                    <span>{this.props.project.amountRaised / 10**18} ETH</span>
                </div>
                <div className='project--content'>
                    <div className='project--description'>
                        <p> {this.props.project.body} </p>
                    </div>
                    <div className='project--donation'>
                        <h3>{this.props.project.title}</h3>
                        {console.log(this.props.project.slug)}

                        <h3>Target amount: {this.props.project.targetAmount / 10**18} ETH</h3> {/* convert the amount to ethers */}
                        {this.props.userAuthenticated === true ?
                        <a href={`/donation/${this.props.project.slug}`}><span>DONATE</span></a>
                        :
                        <a href={`/signin`} onClick={(e) => { e.preventDefault(); 
                            alert("You need to be logged in to donate a project"); 
                            window.location.href = "/signin"; }}><span>DONATE</span></a>
                        }
                        <td>
                        {
                           this.props.project.creator === this.props.account && this.props.project.amountRaised < this.props.project.targetAmount / 20
                           ? 
                          <button
                            name={this.props.project.id}
                            onClick={(event) => {
                                this.props.deleteProject(event.target.name);
                            }}
                          >
                            Delete Project
                          </button> 
                          : null
                      }
                  </td>


                    </div>
            </div>
            </div>
            
        </main>
    )
    }
}

export default AProject;