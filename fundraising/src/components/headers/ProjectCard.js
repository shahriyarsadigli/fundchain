import '../style/ProjectCard.css';
import React, {Component} from 'react';
import { fromWei } from 'web3-utils';



export default function ProjectCard(props) {


    return(
        <div className="project-card">

            <div className="project-content">
                <a href="#"className="project-name">
                    <h4>{props.project.title}</h4>
                    <span className="project-author">By {props.project.creator}</span>

                    <p>{props.project.excerpt}</p>
                </a>
                <div className="donation-amount">
                    <span>{fromWei(props.project.amountRaised, 'ether')} Eth</span>
                    <h6>Raised</h6>
                </div>
             
                <div className="project-footer">
                    <hr></hr>
                    <div className="project-verified">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>VERIFIED</span>  {/* verified by MetaMask */}
                    </div>
                </div>
            </div>
        </div>
    )

}

