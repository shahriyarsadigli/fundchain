import '../style/AProjectPage.css'
import bg from '../images/project-wallpaper.jpg'
import Pimg8 from '../images/project8.jpg'
import React from 'react';


export default function AProject() {
    return (
        <main className='project--main'>
            <div className='project--body '>
                <div className='project--header'>
                    <img src={bg} className='project--bg'/>
                    <div className='project-name-badge'>
                        <div className='project-name-img'>
                            <img src={Pimg8}/>
                        </div>
                        <div className='project-name-info'>
                            <div className="project-name-verified">
                                <i class="fa-solid fa-circle-check"></i>
                                <span>VERIFIED</span>
                            </div>
                            <h2>Crypto Commons</h2>
                            <span>Felix Fritsch</span>
                        </div>
                        
                    </div>
                </div>
                <div className='project--d-info'>
                    <h3>TOTAL FUNDS RECEIVED:</h3>
                    <span>2.004 ETH</span>
                </div>
                <div className='project--content'>
                    <div className='project--description'>
                        <p> Once upon a time, in a world where cryptocurrencies were the norm, 
                            a group of people came together to create the Crypto Commons. 
                            The Crypto Commons was a decentralized platform that allowed users 
                            to share their digital assets and build new applications on top of them.
                            The founding members of the Crypto Commons believed that blockchain 
                            technology should be accessible to everyone, regardless of their background
                            or financial status. They saw the potential for cryptocurrencies to bring 
                            financial empowerment to those who had been excluded from traditional 
                            banking systems. <br></br>
                            <br></br>
                            As the Crypto Commons grew, so did its user base. 
                            People from all over the world began to contribute their own digital assets 
                            and ideas to the platform. Some built new applications that made it easier 
                            to trade cryptocurrencies, while others used the platform to create 
                            digital art and music. Over time, the Crypto Commons became more than 
                            just a platform for sharing digital assets. It became a community of 
                            like-minded individuals who believed in the power of cryptocurrencies 
                            to create a more equitable world. <br></br>
                            <br></br>
                            One day, a major financial crisis hit the world. Traditional banks and 
                            financial institutions were in chaos, and many people lost their savings 
                            overnight. But the Crypto Commons remained strong. Its decentralized nature 
                            and robust security protocols protected it from the turmoil of the 
                            traditional financial system. As more and more people turned to 
                            cryptocurrencies in the wake of the crisis, the Crypto Commons became a 
                            beacon of hope. Its open and transparent nature inspired trust and confidence 
                            in a world that had lost faith in traditional financial institutions.</p>
                    </div>
                    <div className='project--donation'>
                        <h3>Crypto Commons</h3>
                        <a href=""><span>DONATE</span></a>
                    </div>
            </div>
            </div>
            
        </main>
    )
}