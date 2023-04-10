import '../style/DonationPage.css'
import Header2 from '../headers/Header2.js'
import React from 'react';
import Pimg1 from '../images/project1.jpg'


export default function DonationPage() {

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
                        <h3>EVMchain</h3>
                        <h6>Sam Johns</h6>
                        <span>Total Funds Raised: $1947</span>
                    </div>
                </div>
                <div className="donation--info">
                    <div className="donation--details">
                        <h2>Donate with</h2>
                        <span>METAMASK wallet</span>
                    </div>
                    <hr></hr>
                    <div className="donation--balance">
                        <input type="text" className="donation--enter" placeholder="Amount" size ="14"></input>
                        <div className="balance--buttons">
                            <span className="account--balance">Balance</span>
                            <span className="balance--amount">1.00 ETH</span>
                        </div>
                    </div>
                    <div className="donation--submit">
                        <span className="donation--amount">1.00 ETH</span>
                        <a href="#"><span className="donation--button">DONATE</span></a>
                        
                    </div>
                    <div className="card--details">
                        <span>Your total donation:</span>
                        <hr></hr>
                        <h6><i class="fa-brands fa-ethereum"></i>ETH</h6>
                    </div>
                    
                </div>
            </section>
        </main>
    )
}