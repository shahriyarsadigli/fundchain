import React, { Component } from 'react';
import '../style/Header2.css';
import logo from '../images/logo.png';

class Header2 extends Component {
    
    render() {
    return (
        <div>
            <header>
                <nav className="nav-bar">
                    <div className="nav-logo">
                    <a href="/"><img src={logo} className="logo--2" alt="logo"/></a>
                    </div>
                        <div className="nav-buttons">
                            <a href="/"><button type="button">Home</button></a>
                            <a href="/projects"><button type="button">Projects</button></a>
                            <div className="account--button">
                                <button type="button" className="account-button">
                                    <span>{this.props.currentAccountData.name} {this.props.currentAccountData.surname}</span>
                                    <a><span>{Number(this.props.balance).toFixed(3)} ETH</span></a> {/* show until 3 decimal places */}
                                </button> 
                                <div className="circle">
                                    <i class="fa-brands fa-ethereum" id="et-icon"></i>
                                </div>
                                <div className="dropdown-menu">
                                    <a href="/myaccount" className="drop--first">My account</a>
                                    <a href="/create-project">Create a project</a>
                                    <a onClick={() => this.props.logoutUser()} className="drop--last" href="/">Sign Out</a>
                                </div>
                            </div>
                        </div>
                </nav>
            </header>
        </div>
    )
    }
}

export default Header2;