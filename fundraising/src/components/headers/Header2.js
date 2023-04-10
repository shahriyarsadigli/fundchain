import React, { Component } from 'react';
import '../style/Header2.css';
import logo from '../images/logo.png';

class Header2 extends Component {

    
    render() {
    return (
        <div>
            <header>
                {/* Testing comment */}
                <nav className="n-bar">
                <img src={logo} className="logo--2" alt="logo"/>
                    <div className="n-buttons">
                        <div className="menu-buttons">
                            <button type="button"><a href="/">Home</a></button>
                            <button type="button"><a href="/projects">Projects</a></button>  
                        </div>
                        <div className="dropdown">
                            <button type="button" className="account-button">
                                <span>{this.props.currentAccountData.name} {this.props.currentAccountData.surname}</span>
                                <a><span>{Number(this.props.balance).toFixed(3)} ETH</span></a> {/* show until 3 decimal places */}
                            </button> 
                            <div className="dropdown-menu">
                                <a href="/myaccount">My account</a>
                                <a href="/create-project">Create a project</a>
                                <a className="drop--last" href="/"><button onClick={() => this.props.logoutUser()}>Sign Out</button></a>
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
}

export default Header2;