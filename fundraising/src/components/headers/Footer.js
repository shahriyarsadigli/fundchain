import React from 'react';
import logo from '../images/logo.png';
import '../style/Footer.css';

export default function Footer() {
    return (
        <section className='footer'>
            <div className='footer-body'>
                <div className='footer-row'>
                    <a href='/' >Home</a>
                    <a href='/projects' >Projects</a>
                    <a href='/projects' >Donate</a>
                    <a href='/signup' >Sign up</a>
                </div>
                <div className='footer-row'>
                    <a href='/myaccount' >My account</a>
                    <a href='/myaccount' >My projects</a>
                    <a href='create-project' >Create a project</a>
                    <a href='/signin' >Sign in</a>
                </div>
                <div className='footer-row'>
                    <h6>FUNDCHAIN <i class="fa-regular fa-copyright"></i></h6>
                    <span>fundchain2023@gmail.com</span>
                    <span>Powered by Ethereum</span>
                    <span>Baku, Azerbaijan</span>
                </div>
                <div className='footer-row'>
                    <img src={logo}></img>
                </div>
            </div>
        </section>
    )
}