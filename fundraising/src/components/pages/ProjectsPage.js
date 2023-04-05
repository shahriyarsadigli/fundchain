import Header1 from '../headers/Header1.js'
import Header2 from '../headers/Header2.js'
import ProjectCard from '../headers/ProjectCard.js'
import CardData from '../data/cardData.js'
import '../style/Projects.css';
import React, { Component } from 'react';
 

class ProjectsPage extends Component {
      render() {
        const cards = this.props.projects.map(project => {
          return (
            <ProjectCard
              id={project.id}
              project={project}
            />
          );
        });

        return (
          <main className="projects-page">
            <Header2 />
            <section className="projects-body">
              <div className="explore-projects">
                FUNDCHAIN PROJECTS
              </div>
              {console.log(cards)}
              <div className="projects-list">
                {cards}
                
                {/* { this.props.projects.map((project, key) => {
                //{console.log(typeof project.id)}
                if (project.id !== '0') // if the project is not deleted, list it
                return(
                    <tr key={key}>
                    <th scope="row">{project.id}</th>
                    <td>{project.title}</td>
                    <td>{window.web3.utils.fromWei(project.targetAmount.toString(), 'Ether')} Eth</td>
                    <td>{project.creator}</td>
                    <td>{window.web3.utils.fromWei(project.amountRaised.toString(), 'Ether')} Eth</td>
                    </tr>    
                    ) } ) } */}
              </div>
            </section>
          </main>
        );
      }
}

export default ProjectsPage;

