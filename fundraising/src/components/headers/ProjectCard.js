import '../style/ProjectCard.css';
import React, {Component} from 'react';
import { fromWei } from 'web3-utils';



export default function ProjectCard(props) {
    function getCategoryName(category) {
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
      
      

    return(
        <div className="project-card">

            <div className="project-content">
            <a href={`/projects/${props.project.id}`} className="project-name">
                {/* // move to the page of the project with this id  */}
                <h4>{props.project.title}</h4>
                <span className="project-author">By {props.project.creator}</span>
                <p>{props.project.excerpt}</p>
                <p>{getCategoryName(props.project.category)}</p>
            </a>

                <div className="donation-amount">
                    <span>{fromWei(props.project.amountRaised, 'ether')} Eth</span>
                    <h6>Raised</h6>
                </div>
                <div className="donation-amount">
                    <h6>Target Amount</h6>
                    <span>{fromWei(props.project.targetAmount, 'ether')} Eth</span> 
                </div>

             
                <div className="project-footer">
                    <hr></hr>
                    <div className="project-verified">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>VERIFIED</span>  {/* verified by MetaMask */}
                    </div>
                </div>
                {parseInt(window.web3.utils.toWei(props.project.amountRaised.toString(), 'Ether')) >= parseInt(window.web3.utils.toWei(props.project.targetAmount.toString(), 'Ether'))
                        ? <p>Goal Reached!</p>
                        : null }
            </div>
        </div>
    )

}

