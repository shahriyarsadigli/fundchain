import '../style/ProjectCard.css';
import React, {Component} from 'react';


export default function ProjectCard(props) {


    return(
        <div className="project-card">

            <div className="project-content">
                <a href="#"className="project-name">
                    <h4>{props.project.title}</h4>
                    <span className="project-author">{props.project.creator}</span>
                    <p>{props.project.body}</p>
                </a>
                <div className="donation-amount">
                    <span>{props.project.amountRaised}</span>
                    <h6>Raised</h6>
                </div>
             
                <div className="project-footer">
                    <hr></hr>
                    <div className="project-verified">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>VERIFIED</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

