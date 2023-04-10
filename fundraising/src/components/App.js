import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Fundraising from '../abis/Fundraising.json';
import Users from '../abis/Users.json';
import Main from './Main'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignInPage'
import SignUp from './pages/SignUpPage'
import Metamask from './pages/MetamaskPage'
import Projects from './pages/ProjectsPage'
import DonationPage from './pages/DonationPage'
import CreateProject from './pages/CreateProject';

import MyAccountPage from './pages/MyAccountPage'
import AProjectPage from './pages/AProjectPage'

import Header2 from './headers/Header2';
import Header1 from './headers/Header1';



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
        this.setState({
          projects: [...this.state.projects, project]
        })
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

    this.createProject = this.createProject.bind(this)
    this.donateProject = this.donateProject.bind(this)
    this.deleteProject = this.deleteProject.bind(this)

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
    .once('receipt', this.handleTransactionResponse)
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
  
  createProject(title, excerpt, body, targetAmount) {
    this.setState({ loading: true })
    this.state.fundraising.methods.createProject(title, excerpt, body, targetAmount).send({ from: this.state.account })
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

  componentDidMount() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // user was previously authenticated, set the state accordingly
      console.log("if is seen here")

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

  render() {

    return (

      <div>
              { 
               this.state.loading
                
                ? <div id="loader" className="text-center"><p className="text-center" id="alert-message">Loading... Waiting for MetaMask confirmation...</p></div> 
                : 
                <div>
                { this.state.userAuthenticated
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
                          { this.state.userAuthenticated ? <Route path="/" /> // do not let the users access the sign in page once they are signed in
                          : <Route path="/signin" element={<SignIn loginUser={this.loginUser} />} /> }
                          <Route path="/signup" element={<SignUp createUser={this.createUser}/>} />
                          <Route path="/metamask" element={<Metamask />} />
                          <Route path="/projects" element={<Projects account={this.state.account}
                                                                     projects={this.state.projects}
                                                                     userAuthenticated={this.state.userAuthenticated} />} />
                          <Route path="/myaccount" element={<MyAccountPage account={this.state.account}
                                                                           currentAccountData={this.state.currentAccountData} 
                                                                           balance={this.state.balanceInEth}/>} />
                          <Route path="/project" element={<AProjectPage />} />
                          <Route path="/create-project" element={<CreateProject 
                                                        createProject={this.createProject}
                                                        />} />
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
                              <Route key={project.id} path={`/projects/${project.id}`} element={<AProjectPage project={project} />} />
                            ))}

                            {this.state.projects.map((project) => (
                              <Route key={project.id} path={`/donation/${project.id}`} element={<DonationPage project={project} 
                                                                                       donateProject={this.donateProject} 
                                                                                       account={this.state.account}
                                                                                       balance={this.state.balanceInEth}
                                                                                                              />} />
                            ))}
                        </Routes>
                      </BrowserRouter>
                </div>
                      
              }                  
      
      </div>
    );
  }
}

export default App;
