import './App.css';
import Main from './Main'

// Web3 library
import Web3 from 'web3'

// React libraries
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Smart contracts
import Fundraising from '../abis/Fundraising.json';
import Users from '../abis/Users.json';

// Created Pages 
import HomePage from './pages/HomePage'
import SignIn from './pages/SignInPage'
import SignUp from './pages/SignUpPage'
import Projects from './pages/ProjectsPage'
import DonationPage from './pages/DonationPage'
import CreateProject from './pages/CreateProject';
import MyAccountPage from './pages/MyAccountPage'
import AProjectPage from './pages/AProjectPage'
import NotFound from './pages/404'
import LoadingPage from './pages/LoadingPage';

// Header files
import Header1 from './headers/Header1';
import Header2 from './headers/Header2';
import Footer from './headers/Footer';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()

    const currentAccount = accounts[0]
    // save the current account
    this.setState({ account: currentAccount })
    
    const networkId = await web3.eth.net.getId()
    const networkData = Fundraising.networks[networkId]
    const networkData2 = Users.networks[networkId]

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // user was previously authenticated, set the state accordingly
      this.setState({ userAuthenticated: true });

      const balanceInWei = await web3.eth.getBalance(this.state.account);
      const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
      this.setState({ balanceInEth })
    }

    if(networkData) {
      const fundraising = new web3.eth.Contract(Fundraising.abi, networkData.address)
      this.setState({ fundraising })
      const users = new web3.eth.Contract(Users.abi, networkData2.address)
      this.setState({ users })
      const projectNum = await fundraising.methods.projectNum().call()
      this.setState({ projectNum })

      const currentAccountData = await this.state.users.methods.users(currentAccount).call()
      this.setState({
        currentAccountData: currentAccountData
      });
      // Load projects
      for (var i = 1; i <= projectNum; i++) {
        const project = await fundraising.methods.projects(i).call()
        if (project.id !== "0") { // do not read the deleted projects which have the id as 0
          this.setState({
            projects: [...this.state.projects, project]
          })
        }
      }
      this.setState({ loading: false })
    } else {
      window.alert('Fundraising contract not deployed to detected network.')
    }

  
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      projectNum: 0,
      projects: [],
      loading: true,
      userAuthenticated: false, // initially there is no user logged in
      currentAccountData: null
    }

    // Fundraising project functions
    this.createProject = this.createProject.bind(this)
    this.donateProject = this.donateProject.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.searchProjects = this.searchProjects.bind(this)
    this.filterProjects = this.filterProjects.bind(this)

    // Users functions
    this.createUser = this.createUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)

    console.log(this.state.userAuthenticated)
  }

  handleTransactionResponse = (receipt) => {
    this.setState({ loading: false })
    window.location.reload();
  }
  
  handleTransactionError = (error) => {
    if (error.code === 4001) { // error code of user rejection is 4001
      // User rejected the transaction
      const message = 'Transaction rejected by user';
      document.getElementById('alert-message').textContent = message;
    } 
    else if (error.code === -32603) { // error code of duplicate account or username exists
      const message = 'The address and/or username already exist! Try a new one!';
      document.getElementById('alert-message').textContent = message;
    }
    else {
      // Other error occurred, handle it appropriately
      console.error(error);
    }
    setTimeout(() => { // reload the page after 2 seconds of showing the message to the user
      window.location.reload();
    }, 2000);
  }

  createUser(name, surname, username, email, password) {
    const web3 = window.web3
    this.setState({ loading: true })
    const passwordHash = web3.utils.sha3(password)
    this.state.users.methods.createUser(name, surname, username, email, passwordHash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      this.setState({ userAuthenticated: true });
      localStorage.setItem('isLoggedIn', true);
      window.location.href = '/'; // redirect to main page
    })
    .on('error', (error, receipt) => {
      this.handleTransactionError(error);
    });
  }

  async loginUser(email, password) {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    const user = accounts[0];
  
    if (!this.state.users) {
      console.log("Users contract is not loaded yet");
      return;
    }
  
    const userObj = await this.state.users.methods.users(user).call();
    const inputPasswordHash = web3.utils.sha3(password);
  
    if (userObj.email === email && userObj.passwordHash === inputPasswordHash) {
      console.log("Logged in successfully");
      // set the user as logged in
      this.setState({ userAuthenticated: true });
      localStorage.setItem('isLoggedIn', true);
      window.location.href = '/'; // redirect to main page
    } else {
      console.log("Invalid username or password");
      // display an error message
      this.setState({ userAuthenticated: false, loginError: true });
    }
  }

  async logoutUser() {
    this.setState({ userAuthenticated: false });
    localStorage.removeItem('isLoggedIn');
  }
  
  createProject(title, excerpt, body, category, targetAmount) {
    if (targetAmount <= 0) {
      alert("Target amount must be above zero!")
      return;
    }
    if (!this.state.userAuthenticated) {
      alert('You must be logged in to create a project.');
      return;
  }
    this.setState({ loading: true })
    let slug = slugify(title);
    const len = this.state.projects.length;
    const uniqueID = len > 0 ? parseInt(this.state.projects[len - 1].id) + 1 : 1; // the id projects will always be unique as it is increasing in each project creation
    // and we assign the uniqueID as 1 if the 
    slug += "-" + uniqueID;

    this.state.fundraising.methods.createProject(title, excerpt, body, slug, category, targetAmount).send({ from: this.state.account })
    .once('receipt', () => {
      this.handleTransactionResponse();
      this.setState({ loading: true }) // show loading screen before redirecting to the projects page
      window.location.href = '/projects'; // redirect to projects page
    })
    .catch(this.handleTransactionError);
  }

  donateProject(id, amount) {
    this.setState({ loading: true })
    this.state.fundraising.methods.donateProject(id).send({ from: this.state.account, value: amount })
    .once('receipt', this.handleTransactionResponse)
    .catch(this.handleTransactionError);
  }

  deleteProject(id) {
    this.setState({ loading: true })
    this.state.fundraising.methods.deleteProject(id).send({ from: this.state.account })
    .once('receipt', this.handleTransactionResponse)
    .catch(this.handleTransactionError);
  }

  async searchProjects(query) {
    // const web3 = window.web3;
    const fundraising = this.state.fundraising;

    const projectNum = await fundraising.methods.projectNum().call();
    const projects = [];

    for (let i = 1; i <= projectNum; i++) {
      const project = await fundraising.methods.projects(i).call();
      if (project.title.toLowerCase().includes(query.toLowerCase()) || project.excerpt.toLowerCase().includes(query.toLowerCase())) {
        projects.push(project);
      }
    }

    this.setState({ projects: projects });

    // add a message here and pass to the view
    // if (projects.length === 0) {
    //   alert("No projects matching the search query were found.");
    // }
  }

  async filterProjects(category) {
    const web3 = window.web3;
    const fundraising = this.state.fundraising;
  
    const projectNum = await fundraising.methods.projectNum().call();
    const projects = [];

    console.log(category)

    if (category === "All") { 
      for (let i = 1; i <= projectNum; i++) {
        const project = await fundraising.methods.projects(i).call();
        projects.push(project);
      }
    }
    else {
      for (let i = 1; i <= projectNum; i++) {
        const project = await fundraising.methods.projects(i).call();
        if (Number(project.category) === Number(category)) {
          projects.push(project);
          }
        }
    } 
  
    this.setState({ projects: projects });
  
    // if (projects.length === 0) {
    //   alert("No projects matching the selected category were found.");
    // }
  }
  

  componentDidMount() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // user was previously authenticated, set the state accordingly
      // console.log("if is seen here")

      this.setState({ userAuthenticated: true }, () => {
        console.log(this.state.userAuthenticated);
      });
    }

    // if the user changes the account in metamask, then log the user out
    window.ethereum.on('accountsChanged', (accounts) => {
      // If the user changes their account, log them out
      if (this.state.userAuthenticated) {
        this.logoutUser();
      }
    });
  }

  isAuthenticated = () => {
    return this.state.userAuthenticated;
  }

  render() {

    return (

      <div>

              { 
               this.state.loading
                
                ? <LoadingPage />
                : 
                <div>
                { this.isAuthenticated()
                ? 
                <Header2 account={this.state.account}
                        logoutUser={this.logoutUser} 
                        currentAccountData={this.state.currentAccountData} 
                        balance={this.state.balanceInEth}
                        />

                : 
                <Header1/>
                }
                <BrowserRouter>
                        <Routes>
                          <Route index element={<HomePage />} />
                          { this.state.userAuthenticated ? <Route path="/signin" element={<Navigate replace to="/" />} /> // do not let the users access the sign in page once they are signed in
                          : <Route path="/signin" element={<SignIn loginUser={this.loginUser} />} /> }
                          <Route path="/signup" element={<SignUp createUser={this.createUser}/>} />
                          <Route path="/projects" element={<Projects account={this.state.account}
                                                                     projects={this.state.projects}
                                                                     userAuthenticated={this.state.userAuthenticated}
                                                                     searchProjects={this.searchProjects}
                                                                     filterProjects={this.filterProjects} />} />

                          <Route path="/myaccount" element={this.isAuthenticated() ? <MyAccountPage account={this.state.account}
                                                                           currentAccountData={this.state.currentAccountData} 
                                                                           balance={this.state.balanceInEth}/> : <Navigate replace to="/signin" />} />

                          <Route path="/create-project" element={this.isAuthenticated() ? <CreateProject 
                                                        createProject={this.createProject}
                                                        /> : <Navigate replace to="/signin" />} />




                          <Route path="/main" element={<Main 
                                                        account={this.state.account}
                                                        projects={this.state.projects}
                                                        createProject={this.createProject}
                                                        donateProject={this.donateProject} 
                                                        deleteProject={this.deleteProject}
                                                        
                                                        createUser={this.createUser}
                                                        loginUser ={this.loginUser}
                                                        logoutUser={this.logoutUser}/>} />

                            {this.state.projects.map((project) => (
                              <Route key={project.id} path={`/project/${project.slug}`} 
                                                      element={<AProjectPage 
                                                      project={project}
                                                      account={this.state.account}
                                                      userAuthenticated={this.state.userAuthenticated}
                                                      deleteProject={this.deleteProject}
                                                      />} />
                            ))}

                            {
                              this.state.projects.map((project) => (
                              !this.state.userAuthenticated ? <Route path={`/donation/${project.id}`} element={<Navigate replace to="/signin" />} /> // do not let the users access the sign in page once they are signed in
                              : 
                              
                              <Route key={project.id} path={`/donation/${project.id}`} element={<DonationPage project={project} 
                                                                                       donateProject={this.donateProject} 
                                                                                       account={this.state.account}
                                                                                       balance={this.state.balanceInEth}
                                                                                       userAuthenticated={this.state.userAuthenticated}
                                                                                                              />} />
                            ))}

                            <Route path="*" element={<NotFound />} />

                        </Routes>
                      </BrowserRouter>



                  <Footer />
                </div>
                            
                      
              }      
                        
      
      </div>
    );
  }
}

export default App;
