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
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleCategoryChange(selectedCategory) {
    this.setState({ selectedCategory });
    this.props.filterProjects(selectedCategory.value);
  }
  

  handleSearchInputChange(event) {
    const query = event.target.value;
    this.setState({ query });
    this.props.searchProjects(query);
  }

  handlePrevClick() {
    const container = document.querySelector('.category-carousel');
    container.scrollTo({
      left: container.scrollLeft - 80,
      behavior: 'smooth'
    });
  }
  
  handleNextClick() {
    const container = document.querySelector('.category-carousel');
    container.scrollTo({
      left: container.scrollLeft + 80,
      behavior: 'smooth'
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

    const categories = [
      { value: null, label: "All" },
      { value: 0, label: "Other" },
      { value: 1, label: "Technology" },
      { value: 2, label: "Healthcare" },
      { value: 3, label: "Environment" },
      { value: 4, label: "Education" },
      { value: 5, label: "Arts" }
    ];

    if (!this.state.selectedCategory) {
      this.setState({ selectedCategory: categories[0] });
    }

    return (
      <main className="projects-page">
        <section className="projects-body">
          <div className="explore-projects" >
            FundChain Projects
            <h5>Smart giving made easy with blockchain fundraising</h5>
          </div>
          <div className="search-bar">
            <div className="search-container">
              <input className="search-input" type="text" placeholder="Search projects" value={this.state.query} onChange={this.handleSearchInputChange} />
            </div>
            <button className="prev-btn" onClick={this.handlePrevClick}><i className="fa fa-angle-left"></i></button>
            <div className="category-carousel">
              {categories.map(category => (
                <div key={category.value} className={this.state.selectedCategory.value === category.value ? "category-active" : "category"} onClick={() => this.handleCategoryChange(category)}>
                  {category.label}
                </div>
              ))}

            </div>
            <button className="next-btn" onClick={this.handleNextClick}><i className="fa fa-angle-right"></i></button>
          </div>

          <div className="projects-list">
            { this.props.projects ?
            cards : <p>no projects found</p>
            //  {cards}
            }
          </div>
        </section>
      </main>
    );
  }
}

export default ProjectsPage;
