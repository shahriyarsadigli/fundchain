import rocket from '../images/The last Rocket.png';
import smoke from '../images/smokey.png';
import Header2 from '../headers/Header2.js'
import '../style/HomePage.css';
import React from 'react';


export default function HomePage() {
    return (
        <main className="main-page">
            <Header2 />
            <section className="home">
                <div className="home-body">
                    <h1>Uplift Bright Ideas</h1>
                    <h5>Be the one to change the future</h5>
                    <img src={rocket} className="donate-rocket" alt=""/>
                    <img src={smoke} className="donate-smoke" alt=""/>
                    <div className="main-buttons">
                    <a href="/projects"><button type="button">VIEW PROJECTS</button></a>
                        <button type="button"><a href=""> CREATE A PROJECT</a></button>
                    </div>
                    
                </div>
            </section>
        </main>
    )
}