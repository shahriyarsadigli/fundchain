import rocket from '../images/Ethereum-Logo.png';
import smoke from '../images/smokey.png';
import Header1 from '../headers/Header1.js'
import '../style/HomePage.css';
import React from 'react';


export default function HomePage() {
    return (
        <main className="main-page">
            <section className="home">
                <div className="home-body">
                    <h1>Uplift Bright Ideas</h1>
                    <h5>Be the one to change the future with fundchain</h5>
                    <img src={rocket} className="donate-rocket" alt=""/>
                    <img src={smoke} className="donate-smoke" alt=""/>
                    <div className="main-buttons">
                        <a href="/projects"><button type="button">VIEW PROJECTS</button></a>
                        <a href="/create-project"><button type="button">CREATE A PROJECT</button></a>
                    </div>
                    
                </div>
            </section>
        </main>
    )
}