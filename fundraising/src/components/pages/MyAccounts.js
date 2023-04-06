import Header2 from '../headers/Header2.js'
import '../style/MyAccounts.css'
import Avatar1 from '../images/Avatar1.jpg'
import React from 'react';

export default function MyAccounts() {
    return (
        <div className='myaccounts-body'>
            <Header2 />
            <main className='myaccounts-page'>
                <div className='info-details'>
                <img src={Avatar1} className="avatar"/>
                <p id="user">User Information</p>
                <p id="name">User Name</p>
                <p id='username'>username</p>
                <p id ="mail">username01@gmail.com</p>
                <p className='salam'>Wallet Address:  0x647862d87995eda2061dbe8740f07f33dd0bcc4c </p>
                </div>
                <div className='myaccounts-statistics'>
                <p>Donations: 0</p>
                <p>Total Donations Amount: 0</p>
                </div>
                <div className='myaccounts-statistics1'>
                    <p id="dash">PROJECTS: 0</p>
                    <p id="don">TOTAL DONATION: 0</p>
                </div>
            </main>
        </div>
        
    )

}