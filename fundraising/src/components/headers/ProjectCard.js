import '../style/ProjectCard.css';
import React from 'react';


export default function ProjectCard(props) {
    let badgeText
    if (props.project.targetAcquired === 1){
        badgeText = "Target acquired" 
    }

    return(
        <div className="project-card">
            {badgeText && <div className="card-badge">{badgeText}</div>}
            <div className="project-img">
                <a href="#"><img src={props.project.img}/> </a>
            </div>
            <div className="project-content">
                <a href="#"className="project-name">
                    <h4>{props.project.name}</h4>
                    <span className="project-author">{props.project.authorName}</span>
                    <p>{props.project.p}</p>
                </a>
                <div className="donation-amount">
                    <span>{props.project.donationAmount}</span>
                    <h6>Raised</h6>
                </div>
             
                <div className="project-footer">
                    <hr></hr>
                    <div className="project-verified">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>VERIFIED</span>
                    </div>
                    <div className="project-location">
                        <i class="fa-sharp fa-solid fa-location-dot"></i>
                        <span>{props.project.location}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}