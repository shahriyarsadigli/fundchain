import React from 'react';
import '../style/Header1.css';
import logo from '../images/logo.png';

export default function Header1() {
    return (
        <div>
            <header>
                <nav className="navbar">
                <img src={logo} className="logo" alt="logo"/>
                    <div className="home-buttons">
                        <button type="button"><a href="/">Home test</a></button>
                        <button type="button"><a href="/projects">Projects</a></button>
                        <button type="button"><a href="/signin">Sign in</a></button>
                    </div>
                </nav>
            </header>
        </div>
    )
}