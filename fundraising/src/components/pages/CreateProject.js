import '../style/CreateProject.css'
import React, { Component } from 'react'

class CreateProject extends Component {
    state = {
        categories: [
          { value: 0, label: 'Other' },
          { value: 1, label: 'Technology' },
          { value: 2, label: 'Healthcare' },
          { value: 3, label: 'Environment' },
          { value: 4, label: 'Education' },
          { value: 5, label: 'Art' },
        ]
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

                        this.props.createProject(title, excerpt, body, category, targetAmount)
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
                    <label>Target Amount</label>
                    <input
                        id="targetAmount"
                        type="number"
                        ref={(input) => { this.targetAmount = input }}
                        className="project-excerpt"
                        placeholder="Target Amount"
                        required />
                    </div>
                    <div className='project-info5'>
                    <label>Category</label>
                    <select ref={(input) => { this.projectCategory = input }}>
                    {this.state.categories.map((category) => (
                        <option value={category.value}>{category.label}</option>
                    ))}
                    </select>

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