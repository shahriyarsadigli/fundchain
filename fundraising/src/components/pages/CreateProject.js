import '../style/CreateProject.css'
import React, { Component } from 'react'
// Art images 
import art1 from '../images/project_images/art1.jpg'
import art2 from '../images/project_images/art2.jpeg'
import art3 from '../images/project_images/art3.jpg'
import art4 from '../images/project_images/art4.jpg'
import art5 from '../images/project_images/art5.jpg'
// Techology images
import technology1 from '../images/project_images/technology1.jpeg'
import technology2 from '../images/project_images/technology2.jpeg'
import technology3 from '../images/project_images/technology3.jpg'
import technology4 from '../images/project_images/technology4.jpg'
import technology5 from '../images/project_images/technology5.jpg'
// Education images 
import education1 from '../images/project_images/education1.jpg'
import education2 from '../images/project_images/education2.jpg'
import education3 from '../images/project_images/education3.jpg'
import education4 from '../images/project_images/education4.jpg'
import education5 from '../images/project_images/education5.jpg'
// Environment images
import environment1 from '../images/project_images/environment1.jpg'
import environment2 from '../images/project_images/environment2.jpg'
import environment3 from '../images/project_images/environment3.jpg'
import environment4 from '../images/project_images/environment4.jpg'
import environment5 from '../images/project_images/environment5.jpg'
// Healtcare images
import healthcare1 from '../images/project_images/healthcare1.jpg'
import healthcare2 from '../images/project_images/healthcare2.jpg'
import healthcare3 from '../images/project_images/healthcare3.jpg'
import healthcare4 from '../images/project_images/healthcare4.jpg'
import healthcare5 from '../images/project_images/healthcare5.jpg'
// Other images 
import other1 from '../images/project_images/Other1.jpg'
import other2 from '../images/project_images/Other2.jpg'
import other3 from '../images/project_images/Other3.jpg'
import other4 from '../images/project_images/Other4.png'
import other5 from '../images/project_images/Other5.jpg'

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
        selectedCategory: 'Other', // Default category
        projectData: {
              image: '',
              selectedImageUrl: ''
        },
      };

    categoryImages = {
        Technology: [
            { value: 'technology1.jpeg', image: technology1 },
            { value: 'technology2.jpeg', image: technology2 },
            { value: 'technology3.jpg', image: technology3 },
            { value: 'technology4.jpg', image: technology4 },
            { value: 'technology5.jpg', image: technology5 },
          ],
        Art: [
            { value: 'art1.jpg', image: art1 },
            { value: 'art2.jpeg', image: art2 },
            { value: 'art3.jpg', image: art3 },
            { value: 'art4.jpg', image: art4 },
            { value: 'art5.jpg', image: art5 },
          ],
        Education: [
            { value: 'education1.jpg',  image: education1 },
            { value: 'education2.jpg', image: education2 },
            { value: 'education3.jpg', image: education3 },
            { value: 'education4.jpg', image: education4 },
            { value: 'education5.jpg', image: education5 },
        ],
        Environment: [
            { value: 'environment1.jpg', image: environment1 },
            { value: 'environment2.jpg', image: environment2 },
            { value: 'environment3.jpg', image: environment3 },
            { value: 'environment4.jpg', image: environment4 },
            { value: 'environment5.jpg', image: environment5 },
        ],
        Healthcare: [
            { value: 'healthcare1.jpg', image: healthcare1 },
            { value: 'healthcare2.jpg', image: healthcare2 },
            { value: 'healthcare3.jpg', image: healthcare3 },
            { value: 'healthcare4.jpg', image: healthcare4 },
            { value: 'healthcare5.jpg', image: healthcare5 },
        ],
        Other: [
            { value: 'Other1.jpg',  image: other1 },
            { value: 'Other2.jpg',  image: other2 },
            { value: 'Other3.jpg',  image: other3 },
            { value: 'Other4.jpg',  image: other4 },
            { value: 'Other5.jpg',  image: other5 },
        ]
    };
    
    handleCategoryChange = (event) => {
        const categoryValue = event.target.value;
        const categorySelected = this.state.categories.find(category => category.value === parseInt(categoryValue, 10)).label;
        this.setState({ categoryValue, selectedCategory: categorySelected, projectData: {image: ''} }); // update the selected category and reset the image selection
      };

    handleImageChange = (value) => {

        const categoryImages = this.categoryImages[this.state.selectedCategory];
        const selectedImage = categoryImages.find((image) => image.value === value);
        const imageUrl = selectedImage.image;
        this.setState({
            projectData: {
                ...this.state.projectData, 
              image: value,
              selectedImageUrl: imageUrl
            },
            showImageOptions: false
          });
      };
      
      toggleImageOptions = () => {
        this.setState({ showImageOptions: !this.state.showImageOptions });
      };
    
    render() {
        return (
            <main className='create-project-main'>
                <div className='create-project-header'>
                    <h1>Bring Your Ideas to Life with Fundchain</h1>
                    <span>
                        <i class="fa-solid fa-lightbulb"></i>
                        {this.props.currentAccountData.name} {this.props.currentAccountData.surname}
                    </span>
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
                    <div className='create-project-body'>
                        <div className='create-project-title'>
                            <span>Project Title</span>
                            <div className='create-project-input'>
                                <p>What is the title of your project?</p>
                                <input
                                    id="projectName"
                                    type="text"
                                    ref={(input) => { this.projectTitle = input }}
                                    placeholder="Your project title"
                                    required />
                            </div>
                            
                        </div>
                        <div className='create-project-excerpt'>
                            <span>Project Excerpt</span>
                            <div className='create-project-input'>
                                <p>How would you describe your project in 1-2 sentences?</p>
                                <textarea
                                    id="projectExcerpt"
                                    rows="3"
                                    ref={(input) => { this.projectExcerpt = input }}
                                    placeholder="Your project excerpt"
                                ></textarea>
                            </div>
                        </div>
                        <div className='create-project-description'>
                            <span>Project Description</span>
                            <div className='create-project-input'>
                                <p>Provide a comprehensive overview of your project, highlighting key aspects such as the problem being solved, the unique value proposition, and the project team's expertise. The description should be engaging and persuasive, and should make a compelling case for why potential donors should support the project.</p>
                                <textarea
                                    id="projectBody"
                                    type="text"
                                    ref={(input) => { this.projectBody = input }}
                                    placeholder="Describe your project"
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className='create-project-target-amount'>
                            <span>Target Fund Amount</span>
                            <div className='create-project-input'>
                                <p>Set a target amount for your project in ETH. Note that the minimum target amount allowed is 0.5 ETH. Providing a realistic target amount can help to ensure that your project is successfully funded and can move forward with its objectives.</p>
                                <input
                                id="targetAmount"
                                type="number"
                                step="0.0001"
                                min="0.5"
                                ref={(input) => { this.targetAmount = input }}
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
                        </div>
                        <div className='create-project-category'>
                            <span>Project Category</span>
                            <div className='create-project-input'>
                                <p>Choose in what category your project will be in. After choosing your category, choose an image for your category from the corresponding image list.</p>
                                <div className='create-project-category-buttons'>
                                    <select ref={(input) => { this.projectCategory = input }} onChange={this.handleCategoryChange}>
                                        {this.state.categories.map((category) => (
                                        <option value={category.value}>{category.label}</option>
                                        ))}
                                    </select>
                                    <button type="button" onClick={this.toggleImageOptions}>Choose an image for your project</button>
                                    {this.state.showImageOptions && (
                                        <div className="image--selection">
                                            {this.categoryImages[this.state.selectedCategory].map((option) => (
                                            <div
                                                key={option.value}
                                                className={this.state.projectData.image === option.value ? 'selected' : ''}
                                                onClick={() => this.handleImageChange(option.value)}
                                            >
                                                <img src={option.image} alt={option.label} />
                                                <span>{option.label}</span>
                                            </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                        <div className='selected-image'>
                                    <img src={this.state.projectData.selectedImageUrl} />
                                </div>
                        <div className='create-project-publish'>
                            <span>Project Publish</span>
                            <button type="submit">PUBLISH</button>
                        </div>
                    </div>
                </form>
            </main>
    )
    }
}

export default CreateProject;