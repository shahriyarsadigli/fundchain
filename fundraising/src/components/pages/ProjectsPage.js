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
            <section className="projects-body">
              <div className="explore-projects" >
                FUNDCHAIN PROJECTS
              </div>
              <div className="projects-list">
                {cards}
              </div>
            </section>
          </main>
        );
      }
}

export default ProjectsPage;

