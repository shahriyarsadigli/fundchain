import '../style/CreateProject.css'
import React, { Component } from 'react'
import technology1 from '../images/project_images/technology1.jpeg'
import technology2 from '../images/project_images/technology2.jpeg'

class CreateProject extends Component {
    state = {
        categories: [
          { value: 0, label: 'Other' },
          { value: 1, label: 'Technology' },
          { value: 2, label: 'Healthcare' },
          { value: 3, label: 'Environment' },
          { value: 4, label: 'Education' },
          { value: 5, label: 'Art' },
        ],
        showImageMenu: false,
        showImageOptions: false,
        projectData: {
              image: ''
            }
      };
    
    imageOptions = [
        { value: 'technology1.jpeg', label: 'Technology 1', image: technology1 },
        { value: 'technology2.jpeg', label: 'Technology 2', image: technology2 },
        // and so on for all your images
    ];


    handleImageChange = (selectedImage) => {
        this.setState({ projectData: { 
            ...this.state.projectData, 
            image: selectedImage },         
            showImageOptions: false
        })
        console.log(this.state.projectData.image)
      };
      
      toggleImageOptions = () => {
        this.setState({ showImageOptions: !this.state.showImageOptions });
      };
    
    render() {
        return (
        <div className='createproject-body'>
            <main className='createproject-page'>
                <div className='createproject-head'>
                    <h1>CREATE YOUR PROJECT</h1>
                </div>
                <form onSubmit={(event) => {
                        event.preventDefault()
                        const title = this.projectTitle.value
                        const excerpt = this.projectExcerpt.value
                        const body = this.projectBody.value
                        const category = this.projectCategory.value
                        const targetAmount = window.web3.utils.toWei(this.targetAmount.value.toString(), 'Ether')
                        const imagePath = this.state.projectData.image

                        if (!imagePath) {
                            alert('Please select an image for your project')
                            return
                        }

                        this.props.createProject(title, excerpt, body, imagePath, category, targetAmount)
                        }}>
                <div className='project-info'>
                    <div className='project-info-1'>
                    <label>Project Title</label>
                    <input
                        id="projectName"
                        type="text"
                        ref={(input) => { this.projectTitle = input }}
                        className="project-name"
                        placeholder="Title"
                        required />
                    </div>
                    <div className='project-info3'>
                    <label>Excerpt</label>
                    <input
                        id="projectExcerpt"
                        type="text"
                        ref={(input) => { this.projectExcerpt = input }}
                        className="project-excerpt"
                        placeholder="Excerpt"
                        required />
                    </div>
                    <div className='project-info2'>
                    <label>Describe Your Project</label>
                    <input
                        id="projectBody"
                        type="text"
                        ref={(input) => { this.projectBody = input }}
                        className="project-description"
                        placeholder="Describe"
                        required />
                    </div>
                    <div className='project-info4'>
                    <input
                        id="targetAmount"
                        type="number"
                        step="0.0001"
                        min="0"
                        ref={(input) => { this.targetAmount = input }}
                        className="project-excerpt"
                        placeholder="Target Amount"
                        pattern="^\d+(\.\d{1,4})?$"
                        onInvalid={(e) => {
                            e.target.setCustomValidity(
                            'Please enter a valid target amount with up to 4 decimal places'
                            );
                        }}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required/>
                    </div>
                    <div className='project-info5'>
                    <label>Category</label>
                    <select ref={(input) => { this.projectCategory = input }}>
                    {this.state.categories.map((category) => (
                        <option value={category.value}>{category.label}</option>
                    ))}
                    </select>
                    </div>

 

                    <div className="project-info6">
                    <button type="button" onClick={this.toggleImageOptions}>Choose Image</button>
                    {this.state.showImageOptions && (
                        <ul className="image-grid">
                        {this.imageOptions.map((option) => (
                            <li
                            key={option.value}
                            className={this.state.projectData.image === option.value ? 'selected' : ''}
                            onClick={() => this.handleImageChange(option.value)}
                            >
                            <img src={option.image} alt={option.label} />
                            <span>{option.label}</span>
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
    
                    <div className='project-button'>
                    <button type="submit">PUBLISH</button>
                    </div>
                </div>
                </form>
            </main>
        </div>
        
        
    )

    }
}

export default CreateProject;