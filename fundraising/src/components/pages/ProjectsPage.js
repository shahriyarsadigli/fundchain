import ProjectCard from '../headers/ProjectCard.js'
import '../style/Projects.css';
import React, { Component } from 'react';
 

class ProjectsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      selectedCategory: ""
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange(event) {
    this.setState({ selectedCategory: event.target.value });
    console.log(event.target.value)
    this.props.filterProjects(event.target.value);
  }

  handleSearchInputChange(event) {
    const query = event.target.value;
    this.setState({ query });
    this.props.searchProjects(query);
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

    const categories = [
      { value: null, label: "All" },
      { value: 0, label: "Other" },
      { value: 1, label: "Technology" },
      { value: 2, label: "Healthcare" },
      { value: 3, label: "Environment" },
      { value: 4, label: "Education" },
      { value: 5, label: "Arts" }
    ];

    return (
      <main className="projects-page">
        <section className="projects-body">
          <div className="explore-projects" >
            FUNDCHAIN PROJECTS
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search projects" value={this.state.query} onChange={this.handleSearchInputChange} />
          </div>
          <div>
            <select value={this.state.selectedCategory} onChange={this.handleCategoryChange}>
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
                ))}
            </select>
          </div>
          <div className="projects-list">
            {/* { this.props.projects ?
            cards : <p>no projects found</p> */}
            {cards}
          </div>
        </section>
      </main>
    );
  }
}

export default ProjectsPage;
