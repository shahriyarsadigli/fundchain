import '../style/DonationPage.css'
import Header2 from '../headers/Header2.js'
import React from 'react';


export default function DonationPage() {

    return (
        <main>
            <Header2 />
            <section className="donation--card">
                <div className="project--info">
                    <div className="project--img"></div>
                </div>
                <div className="donation--info">
                    <div className="project--info"></div>
                </div>
            </section>
        </main>
    )
}