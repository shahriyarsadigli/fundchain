import Artwork from '../images/Fundchain-artwork.png'
import '../style/HomePage.css';
import React, { Component } from 'react';
import ProjectCard from '../headers/ProjectCard.js'
import HomeBgS1 from '../images/HomeBg-2.png'


class HomePage extends Component {

    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }

    scrollToProjects() {
        window.scrollTo({
          top: document.documentElement.scrollHeight * 0.42,
          behavior: "smooth"
        });
    }
      
    render() {
        const cards = this.props.projects.map(project => {
            if (project.id != 0)
              return (
                <ProjectCard
                  id={project.id}
                  project={project}
                />
              );
          });


    return (
        
        <main className="main-page">
            <section className="home">
                <div className="home-body">
                    <div className="home-content">
                        <h1>FundChain empowers <br></br>the future of startups  with<br></br>secure and transparent fundraising.</h1>
                        <h5>Join the decentralized revolution of startup funding powered by Ethereum.</h5>
                        <img src={Artwork} className="home--artwork"/>
                        <img src={HomeBgS1} className="home--bg2"/>
                    </div>
                    <div className="main--buttons">
                        <a onClick={this.scrollToProjects}><button type="button">VIEW PROJECTS</button></a>
                        <a href="/create-project"><button type="button">CREATE A PROJECT</button></a>
                    </div>
                </div>
            </section>
            <section className="home--promotion">
                <div className="promotion--title">
                    <span>Fundraising on FundChain takes</span>
                    <span>just a few minutes</span>  
                </div>
                <div className="promotion--sections">
                    <div>
                        <div className="icon--section">
                            <i class="fa-solid fa-hand-holding-medical"></i>    
                        </div>
                        <div className='text--section'>
                            <h4>Give Support</h4>
                            <div className='text--body'>
                                <p>Help startups succeed with your donation and gain access to exclusive rewards, support, and recognition.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="icon--section">
                            <i class="fa-solid fa-heart-circle-plus"></i> 
                        </div>
                        <div className='text--section'>
                            <h4>Share Happiness</h4>
                            <div className='text--body'>
                                <p>Spread joy and make a positive impact on the world by supporting innovative startups through your donation.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="icon--section">
                            <i class="fa-solid fa-lightbulb"></i>
                        </div>
                        <div className='text--section'>
                            <h4>Inspire Others</h4>
                            <div className='text--body'>
                                <p>Inspire others to create positive change by supporting innovative startups and joining a community of like-minded individuals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='projects--list-header'>FUNDCHAIN PROJECTS</div>
            <section className='projects--list'>
                { this.props.projects.length ?
                cards : 
                <div className="no-projects" ><h1>No projects to display...</h1></div>
                }
            
                <div className="scroll-button">
                    <div className='scroll-button-holder' onClick={this.scrollToTop}>
                        <i class="fas fa-arrow-up"></i>
                    </div>  
                </div>

            </section>
        </main>
    )
}
}

export default HomePage;