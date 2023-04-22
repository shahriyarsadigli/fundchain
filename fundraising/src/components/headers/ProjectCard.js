import '../style/ProjectCard.css';
// import React, {Component} from 'react';
import { fromWei } from 'web3-utils';
import React, { useState } from 'react';



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
    
    const images = require.context('../images/project_images', true);

    // Donation bar
    const donationTarget = fromWei(props.project.targetAmount)
    const amountRaised = fromWei(props.project.amountRaised)

    const [percentageRaised, setPercentageRaised] = useState(Math.floor((amountRaised / donationTarget) * 100));


    return(
        <div className="project-card">

          <a href={`/project/${props.project.slug}`} className="project-content">
            <div className="project-img">
                    <img src={images(`./${props.project.imagePath}`)} alt="" />
                    <span>{getCategoryName(props.project.category)}</span>
            </div>  
            <div  className="project-name">
                {/* move to the page of the project with this id  */}
                <h4>{props.project.title}</h4>
                <p>{props.project.excerpt}</p>
            </div>

            <div className="donation-amount">
                    <div className='donation-raised'>
                      <h6>Raised: <span>{fromWei(props.project.amountRaised, 'ether')} Eth</span></h6>
                      <span className='donation-percentage'>{percentageRaised}%</span>
                    </div>
                    <div className='donation-bar'>
                      <span className='donation-progress' style={{width: `${percentageRaised}%`}}></span>
                    </div>
                    
                    {/* <h6>Target Amount</h6>
                    <span>{fromWei(props.project.targetAmount, 'ether')} Eth</span>  */}
            </div>
            <div className="project-footer">
                    <span className="project-author">{props.project.ownerData.name} {props.project.ownerData.surname}</span>
                    <div className="project-verified">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>VERIFIED</span>  {/* verified by MetaMask */}
                    </div>
            </div>
            {parseInt(window.web3.utils.toWei(props.project.amountRaised.toString(), 'Ether')) >= parseInt(window.web3.utils.toWei(props.project.targetAmount.toString(), 'Ether'))
                        ? <p>Goal Reached!</p>
                        : null }    

          </a>
        </div>
    )

}

