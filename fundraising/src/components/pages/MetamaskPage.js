import metamask from '../images/Metamask.png';
import Header1 from '../headers/Header1.js'
import '../style/MetamaskPage.css';
import React from 'react';


export default function HomePage() {
    return (
        <div className='m-page'>
            <main className="metamask-page">
                <Header1 />
            </main>
            <div className='meta-img'>
                <img src={metamask} className="metamask-img" alt=""/>
                <button type="button"><a href="">Sign in with your Metamask wallet</a></button>
                <span className="switch-button"><a href="/signin"> Back to Sign in</a></span>
            </div>
        </div>
        
    )
}