import Artwork from '../images/Fundchain-artwork.png'
import '../style/HomePage.css';
import React from 'react';


export default function HomePage() {
    return (
        <main className="main-page">
            <section className="home">
                <div className="home-body">
                    <div className="home-content">
                        <h1>FundChain empowers <br></br>the future of startups  with<br></br>secure and transparent fundraising.</h1>
                        <h5>Join the decentralized revolution of startup funding powered by Ethereum.</h5>
                        <img src={Artwork} className="home--artwork"/>
                    </div>
                    <div className="main--buttons">
                        <a href="/projects"><button type="button">VIEW PROJECTS</button></a>
                        <a href="/create-project"><button type="button">CREATE A PROJECT</button></a>
                    </div>
                </div>
            </section>
            <section className="home--promotion">
                <div className="promotion--title">
                    <span>Fundraising on FundChain takes</span>
                    <span>just a few minutes</span>  
                </div>
                <div className="promotion--sections">
                    <div>
                        <div className="icon--section">
                            <i class="fa-solid fa-hand-holding-medical"></i>    
                        </div>
                        <div className='text--section'>
                            <h4>Give Support</h4>
                            <div className='text--body'>
                                <span>Help startups succeed with your</span>
                                <span>donation and gain access to</span>
                                <span>exclusive rewards, support, and</span>
                                <span>recognition.</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="icon--section">
                            <i class="fa-solid fa-heart-circle-plus"></i> 
                        </div>
                        <div className='text--section'>
                            <h4>Share Happiness</h4>
                            <div className='text--body'>
                                <span>Spread joy and make a positive</span>
                                <span>impact on the world by</span>
                                <span>supporting innovative startups</span>
                                <span>through your donation.</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="icon--section">
                            <i class="fa-solid fa-lightbulb"></i>
                        </div>
                        <div className='text--section'>
                            <h4>Inspire Others</h4>
                            <div className='text--body'>
                                <span>Inspire others to create positive</span>
                                <span>change by supporting innovative</span>
                                <span> startups and joining a community</span>
                                <span>of like-minded individuals.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}