import '../style/DonationPage.css'
import React, { Component } from 'react';
import Pimg1 from '../images/project1.jpg'
import MetamaskIcon from '../images/metamask.svg'


class DonationPage extends Component {

    handleDonate = (event) => {
        // Get the value of the input field
        const inputAmount = this.amount.value;
        if (!inputAmount) {
          alert("Please enter a valid amount.");
          return;
        }
        // Validate the input field against the pattern
        const isValidAmount = this.amount.checkValidity();
        if (!isValidAmount) {
          alert("Please enter a valid donation amount with up to 4 decimal places.");
          return;
        }
        const amount = window.web3.utils.toWei(inputAmount.toString(), 'Ether');                            
        if (parseInt(amount) + parseInt(this.props.project.amountRaised) > parseInt(this.props.project.targetAmount)) {
          // do not execute
          alert("Donation amount exceeds target amount, donation not processed.");
        } else {
          // Pass the input field value as the button value
          this.props.donateProject(event.target.name, amount);
        }
      }
    

    render() {
    
    // Image for a donation card
    const images = require.context('../images/project_images', true);

    return (
        <main>
            <section className="donation--card">
                <div className="project--info">
                    <img className="project--img" src={images(`./${this.props.project.imagePath}`)} alt=""/>
                    <div className="project--details">
                        <div className="project--verified">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>VERIFIED</span>
                        </div>
                        <h3>{this.props.project.title}</h3>
                        {/* Author name to be added */}
                        <h6 className="project-author">{this.props.project.ownerData.name} {this.props.project.ownerData.surname}</h6>
                        <span className='funds--raised'>Total Funds Raised: {this.props.project.amountRaised / 10**18} ETH</span>
                        <span className='funds--amount'>Target Amount: {this.props.project.targetAmount / 10**18} ETH</span>
                    </div>
                </div>
                <div className="donation--info">
                    <div className="donation--details">
                        <h2>Donate with</h2>
                        <span>METAMASK Wallet</span>
                        <img src={MetamaskIcon} />
                        <hr></hr>
                    </div>
                    <div className="donation--balance">
                        <div className="donation--address">
                            <h6>Fund Receiving Address </h6>
                            <span>{this.props.project.creator}</span>
                        </div>
                        <div className="balance--buttons">
                            <span className="account--balance">My Balance</span>
                            <span className="balance--amount">{Number(this.props.balance).toFixed(4)} ETH</span>
                        </div>
                    </div>
                    <div className="donation--submit">
                            {
                            this.props.userAuthenticated === true && this.props.project.creator !== this.props.account && parseInt(window.web3.utils.toWei(this.props.project.amountRaised.toString(), 'Ether')) < parseInt(window.web3.utils.toWei(this.props.project.targetAmount.toString(), 'Ether'))
                            ? 
                                <div>
                                <input id="projectName"
                                    type="number"
                                    step="0.0001"
                                    pattern="[0-9]+(\.[0-9]{1,4})?"
                                    ref={(input) => { this.amount = input }}
                                    className="donation--enter"
                                    placeholder="Donation Amount"
                                    required />
                                <button
                                    name={this.props.project.id}
                                    className="donation--button"
                                    onClick={this.handleDonate}
                                >
                                    Donate
                                </button> 

                                </div>
                            : parseInt(window.web3.utils.toWei(this.props.project.amountRaised.toString(), 'Ether')) >= parseInt(window.web3.utils.toWei(this.props.project.targetAmount.toString(), 'Ether'))
                                ? <p>Goal Reached!</p>
                                : null
                            }
                        
                    </div>
                    
                </div>
            </section>
        </main>
    )
}
}

export default DonationPage;