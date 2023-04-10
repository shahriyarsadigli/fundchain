import rocket from '../images/The last Rocket.png';
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
                    <h5>Be the one to change the future</h5>
                    <img src={rocket} className="donate-rocket" alt=""/>
                    <img src={smoke} className="donate-smoke" alt=""/>
                    <div className="main-buttons">
                        <button type="button"><a href="/projects">VIEW PROJECTS</a></button>
                        <button type="button"><a href="/create-project"> CREATE A PROJECT</a></button>
                    </div>
                    
                </div>
            </section>
        </main>
    )
}