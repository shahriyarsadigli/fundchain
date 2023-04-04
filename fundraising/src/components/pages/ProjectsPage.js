import Header1 from '../headers/Header1.js'
import Header2 from '../headers/Header2.js'
import ProjectCard from '../headers/ProjectCard.js'
import CardData from '../data/cardData.js'
import '../style/Projects.css';
import React from 'react';
 


export default function ProjectsPage() {
    const cards = CardData.map(project => {
        return (
            <ProjectCard
                id = {project.id}
                project = {project}
            />
        )
    })

    return (
        <main className="projects-page">
            <Header2 />
            <section className="projects-body">
                <div className="explore-projects">
                    FundCHAIN PROJECTS
                </div>
                <div className="projects-list">
                    {cards}
                </div>
            </section>
        </main>
    )
}