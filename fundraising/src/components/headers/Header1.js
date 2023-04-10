import React from 'react';
import '../style/Header1.css';
import logo from '../images/logo.png';

export default function Header1() {
    return (
        <div>
            <header>
                <nav className="navbar">
                <img src={logo} className="logo--1" alt="logo"/>
                    <div className="home-buttons">
                        <a href="/"><button type="button">Home</button></a>
                        <a href="/projects"><button type="button">Projects</button></a>
                        <a href="/signin"><button type="button">Sign in</button></a>
                    </div>
                </nav>
            </header>
        </div>
    )
}