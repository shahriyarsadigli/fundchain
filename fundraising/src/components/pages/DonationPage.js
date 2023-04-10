import '../style/DonationPage.css'
import Header2 from '../headers/Header2.js'
import React, { Component } from 'react';
import Pimg1 from '../images/project1.jpg'


class DonationPage extends Component {
    render() {

    return (
        <main>
            <section className="donation--card">
                <div className="project--info">
                    <img className="project--img" src={Pimg1}/>
                    <div className="project--details">
                        <div className="project--verified">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>VERIFIED</span>
                        </div>
                        <h3>{this.props.project.title}</h3>
                        <h6>Fund Receiving Address: {this.props.project.creator}</h6>
                        <span>Total Funds Raised: {this.props.project.amountRaised / 10**18} ETH</span>
                        <span>Target Amount: {this.props.project.targetAmount / 10**18} ETH</span>
                    </div>
                </div>
                <div className="donation--info">
                    <div className="donation--details">
                        <h2>Donate with</h2>
                        <span>METAMASK wallet</span>
                    </div>
                    <hr></hr>
                    <div className="donation--balance">
                        <div className="balance--buttons">
                            <span className="account--balance">Balance</span>
                            <span className="balance--amount">{Number(this.props.balance).toFixed(5)} ETH</span>
                        </div>
                    </div>
                    <div className="donation--submit">
                        {/* <span className="donation--amount">1.00 ETH</span> */}

                            {
                            this.props.project.creator !== this.props.account && parseInt(window.web3.utils.toWei(this.props.project.amountRaised.toString(), 'Ether')) < parseInt(window.web3.utils.toWei(this.props.project.targetAmount.toString(), 'Ether'))
                            ? 
                                <div>
                                <input id="projectName"
                                    type="number"
                                    ref={(input) => { this.amount = input }}
                                    className="donation--enter"
                                    placeholder="Donation Amount"
                                    required />
                                <button
                                    name={this.props.project.id}
                                    className="donation--button"
                                    onClick={(event) => {
                                    // Get the value of the input field
                                    const inputAmount = this.amount.value;
                                    if (!inputAmount) {
                                        alert("Please enter a valid amount.");
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
                                    }}
                                >
                                    Donate
                                </button> 

                                </div>
                            : parseInt(window.web3.utils.toWei(this.props.project.amountRaised.toString(), 'Ether')) >= parseInt(window.web3.utils.toWei(this.props.project.targetAmount.toString(), 'Ether'))
                                ? <p>Goal Reached!</p>
                                : null
                            }
                        
                    </div>
                    <div className="card--details">
                        {/* <span>Your total donation:</span>
                        <hr></hr>
                        <h6><i class="fa-brands fa-ethereum"></i>ETH</h6> */}
                    </div>
                    
                </div>
            </section>
        </main>
    )
}
}

export default DonationPage;