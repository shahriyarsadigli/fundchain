import React, { Component } from 'react';

class Main extends Component {
  

  state = {
    emailValid: false
  };

  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validateEmail = () => {
    const email = this.userEmail.value;
    if (!this.isValidEmail(email)) {
      const errorMessage = "Invalid email address";
      this.emailError.textContent = errorMessage;
    }
    else {
      this.emailError.textContent = "";
    }
    const emailValid = this.isValidEmail(email);
    this.setState({ emailValid });
  }

  handleSubmit = (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    const email = this.userEmail.value;
    if (!this.isValidEmail(email)) {
      return; // don't continue submitting the form
    }
    else {
      const name = this.userName.value
      const surname = this.userSurname.value
      const username = this.userUsername.value
      const email = this.userEmail.value
      const password = this.userPassword.value // get password value from field

      
      this.props.createUser(name, surname, username, email, password)

    }
  };

  handleLogin = (event) => {
    event.preventDefault();
    
    const loginUserEmail = this.loginEmail.value
    const loginUserPassword = this.loginPassword.value

    this.props.loginUser(loginUserEmail, loginUserPassword)
  }
  // fix the handleLogin to make sure that users can log into their accounts
  



  render() {
    return (
      
      <div id="content">
        <h1>Create A Project</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const title = this.projectTitle.value
          const excerpt = this.projectExcerpt.value
          const body = this.projectBody.value
          const targetAmount = window.web3.utils.toWei(this.targetAmount.value.toString(), 'Ether')
          this.props.createProject(title, excerpt, body, targetAmount)

        }}>
          
          <div className="form-group mr-sm-2">
            <input
              id="projectName"
              type="text"
              ref={(input) => { this.projectTitle = input }}
              className="form-control"
              placeholder="Title"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="projectExcerpt"
              type="text"
              ref={(input) => { this.projectExcerpt = input }}
              className="form-control"
              placeholder="Excerpt"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="projectBody"
              type="text"
              ref={(input) => { this.projectBody = input }}
              className="form-control"
              placeholder="Body"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="targetAmount"
              type="number"
              ref={(input) => { this.targetAmount = input }}
              className="form-control"
              placeholder="Target Amount"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
        <p>&nbsp;</p>

        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>

        <h2>Donate Project</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Target Amount</th>
              <th scope="col">Creator</th>
              <th scope="col">Amount Raised</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="projectList">
            { this.props.projects.map((project, key) => {
              //{console.log(typeof project.id)}
              if (project.id !== '0') // if the project is not deleted, list it
              return(
                <tr key={key}>
                  <th scope="row">{project.id}</th>
                  <td>{project.title}</td>
                  <td>{window.web3.utils.fromWei(project.targetAmount.toString(), 'Ether')} Eth</td>
                  <td>{project.creator}</td>
                  <td>{window.web3.utils.fromWei(project.amountRaised.toString(), 'Ether')} Eth</td>
                            
                  <td>
                    {/* if the user is the project creator himself, or if the target amount is already met, do not let the user make a fund */}
                    {
                      project.creator !== this.props.account && parseInt(window.web3.utils.toWei(project.amountRaised.toString(), 'Ether')) < parseInt(window.web3.utils.toWei(project.targetAmount.toString(), 'Ether'))
                      ? 
                        <div>
                          <input id="projectName"
                            type="number"
                            ref={(input) => { this.amount = input }}
                            className="form-control"
                            placeholder="amount"
                            required />
                          <button
                            name={project.id}
                            onClick={(event) => {
                              // Get the value of the input field
                              const inputAmount = this.amount.value;
                              if (!inputAmount) {
                                alert("Please enter a valid amount.");
                                return;
                              }
                              const amount = window.web3.utils.toWei(inputAmount.toString(), 'Ether');                            
                              if (parseInt(amount) + parseInt(project.amountRaised) > parseInt(project.targetAmount)) {
                                // do not execute
                                alert("Donation amount exceeds target amount, donation not processed.");
                              } else {
                                // Pass the input field value as the button value
                                this.props.donateProject(event.target.name, amount);
                              }
                            }}
                          >
                            Donate Project
                          </button> 
                        </div>
                      : parseInt(window.web3.utils.toWei(project.amountRaised.toString(), 'Ether')) >= parseInt(window.web3.utils.toWei(project.targetAmount.toString(), 'Ether'))
                        ? <p>Goal Reached!</p>
                        : null
                    }
                  </td>

                  <td>
                        {
                           project.creator === this.props.account
                           ? 
                        
                          <button
                            name={project.id}
                            onClick={(event) => {
                                this.props.deleteProject(event.target.name);
                            }}
                          >
                            Delete Project
                          </button> 
                          : null
                      }
                  </td>
                  


                  

                </tr>
              )
            })}
          </tbody>
        </table>

        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>

        <h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          
          <div className="form-group mr-sm-2">
            <input
              id="userName"
              type="text"
              ref={(input) => { this.userName = input }}
              className="form-control"
              placeholder="name"
              pattern="[A-Za-z]+"
              onInvalid={(e) => {e.target.setCustomValidity("Please enter only letters for the name")}}
              onInput={(e) => e.target.setCustomValidity('')}
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="userSurname"
              type="text"
              ref={(input) => { this.userSurname = input }}
              className="form-control"
              placeholder="surname"
              pattern="[A-Za-z]+"
              onInvalid={(e) => {e.target.setCustomValidity("Please enter only letters for the surname")}}
              onInput={(e) => e.target.setCustomValidity('')}
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="userUsername"
              type="text"
              ref={(input) => { this.userUsername = input }}
              className="form-control"
              placeholder="username"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="userEmail"
              type="text"
              ref={(input) => { this.userEmail = input }}
              className="form-control"
              placeholder="email"
              required 
              onBlur={this.validateEmail}
              />
            <span className="text-danger" ref={(span) => { this.emailError = span }}></span>
          </div>
          <div className="form-group mr-sm-2">
              <input
                id="userPassword"
                type="password"
                ref={(input) => { this.userPassword = input }}
                className="form-control"
                placeholder="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                onInvalid={(e) => {e.target.setCustomValidity("Please enter at least one lowercase letter, one uppercase letter, one number, and a minimum length of 8 characters")}}
                onInput={(e) => e.target.setCustomValidity('')}
                required 
              />
              <label htmlFor="userPassword">Password (must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number)</label>

          </div>

          
          
          <button
            type="submit"
            className="btn btn-primary"
          >Register</button>
        </form>

        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>


        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <div className="form-group mr-sm-2">
            <input
              id="loginEmail"
              type="text"
              ref={(input) => { this.loginEmail = input }}
              className="form-control"
              placeholder="email"
              required 
            />
            <span className="text-danger" ref={(span) => { this.emailError = span }}></span>
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="loginPassword"
              type="password"
              ref={(input) => { this.loginPassword = input }}
              className="form-control"
              placeholder="password"
              required 
            />
            <label htmlFor="loginPassword">Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >Login</button>
        </form>


      </div>
      

      
    );
  }
}

export default Main;
