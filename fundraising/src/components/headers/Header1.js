import React from 'react';
import '../style/Header1.css';
import logo from '../images/logo.png';

export default function Header1() {
    return (
        <div>
            <header>
                <nav className="navbar">
                    <div className="nav-logo">
                    <a href="/"><img src={logo} className="logo--1" alt="logo"/></a>                    
                    </div>
                    <div className="home-buttons">
                        <a href="/">Home</a>
                        <a href="/projects">Projects</a>
                        <a href="/signin">Sign in</a>
                    </div>
                </nav>
            </header>
        </div>
    )
}