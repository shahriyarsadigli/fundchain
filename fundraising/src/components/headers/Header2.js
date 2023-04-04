import React from 'react';

import '../style/Header2.css';
import logo from '../images/logo.png';

export default function Header2() {
    return (
        <div>
            <header>
                <nav className="n-bar">
                <img src={logo} className="logo--2" alt="logo"/>
                    <div className="n-buttons">
                        <div className="menu-buttons">
                            <button type="button"><a href="/">Home</a></button>
                            <button type="button"><a href="/projects">Projects</a></button>  
                        </div>
                        <div className="dropdown">
                            <button type="button" className="account-button">
                                <span>Walter White</span>
                                <a href="#">2.00 ETH</a>
                            </button> 
                            <div className="dropdown-menu">
                                <a className="drop--first" href="#">WALLET</a>
                                <a href="#">My account</a>
                                <a href="#">Create a project</a>
                                <a className="drop--last" href="#">Sign out</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="circle">
                    <i class="fa-brands fa-ethereum" id="et-icon"></i>
                </div>
                
            </header>
        </div>
    )
}