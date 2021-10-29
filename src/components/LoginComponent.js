import React, {Component} from "react";
import {Navbar,NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight, faUserAlt } from '@fortawesome/free-solid-svg-icons'



class Login extends Component {

    constructor(props) {

		super(props);

		this.state={
			isLoginModalOpen: false,
			isSignupModalOpen: false,
			isNavOpen: false
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleLoginModal = this.toggleLoginModal.bind(this);
		this.toggleSignupModal = this.toggleSignupModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
	}


	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}

	toggleLoginModal(){
		this.setState({
			isLoginModalOpen: !this.state.isLoginModalOpen
		});
	}

	toggleSignupModal() {
		this.setState({
			isSignupModalOpen: !this.state.isSignupModalOpen
		});
	}

	handleLogin(event){
		this.toggleLoginModal();
		alert("Username: " + this.username.value + "Password: " + this.password.value + "Remember: " + this.remember.checked);
		event.preventDefault();

	}

	handleSignup(event) {
		this.toggleSignupModal();
		if (this.first_password.value === this.repeat_password.value)
			alert("Username: " + this.username.value + "Password: " + this.first_password.value);
		else
			alert("The two password value must be the same!");
		event.preventDefault();
	}

    render() {
        return(
            <div className='background'>
				<Navbar dark >
        			<div className="container">
						<div className='row'>
							<div className='col-6'>
								<NavbarBrand className="mr-auto" href="/">
									<img src="assets/images/logo.png" height = "100%" width ="100%" alt="expolab"/>
								</NavbarBrand>
							</div>
							<div className='col-6'>
								<Nav className="ml-auto row">
									<NavItem className='col-3 float-right'>
										<Button primary outline onClick={this.toggleLoginModal}>
										<FontAwesomeIcon icon={faHandPointRight} /> Login
										</Button>
									</NavItem>
									<NavItem className='col-3 float-right'>
										<Button primary outline onClick={this.toggleSignupModal}>
										<FontAwesomeIcon icon={faUserAlt} />   Sign Up
										</Button>
									</NavItem>
								</Nav>
							</div>
						</div>
        			</div> 
      			</Navbar>
      			<Jumbotron primary>
      				<div className="container">
      					<div className="row row-header">
      						<div className="col-12 col-sm-6">
      							<h1>Document Verifier</h1>
      							<p>We verify document originality and keep a record for you 
                                      so that there's no hassles in the future! :) 
      							</p>
      						</div>
      					</div>
      				</div>
      			</Jumbotron>
      			<Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
      				<ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
      				<ModalBody>
      					<Form onSubmit={this.handleLogin}>
      						<FormGroup>
      							<Label htmlFor="username">Username</Label>
      							<Input type="text" id="username" name="username" innerRef={(input) => this.username = input}/> 
      						</FormGroup>
      						<FormGroup>
      							<Label htmlFor="password">Password</Label>
      							<Input type="password" id="password" name="password" innerRef={(input) => this.password = input}/> 
      						</FormGroup>
      						<FormGroup check>
      							<Label check>
      								<Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}/>
      								Remember me
      							</Label>
      						</FormGroup>
      						<Button type="submit" value="submit" color="primary">Login</Button>
      					</Form>
      				</ModalBody>
      			</Modal>
				<Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
      				<ModalHeader toggle={this.toggleSignupModal}>Sign Up</ModalHeader>
      				<ModalBody>
      					<Form onSubmit={this.handleSignup}>
      						<FormGroup>
      							<Label htmlFor="username">Username</Label>
      							<Input type="text" id="username" name="username" innerRef={(input) => this.username = input}/> 
      						</FormGroup>
      						<FormGroup>
      							<Label htmlFor="first_password">Password</Label>
      							<Input type="first_password" id="first_password" name="first_password" innerRef={(input) => this.first_password = input}/> 
      						</FormGroup>
      						<FormGroup>
      							<Label htmlFor="repeat_password">Repeat Password</Label>
      							<Input type="repeat_password" id="repeat_password" name="repeat_password" innerRef={(input) => this.repeat_password = input}/> 
      						</FormGroup>
      						<Button type="submit" value="submit" color="primary">Sign Up</Button>
      					</Form>
      				</ModalBody>
      			</Modal>
			</div>
        ); 
    }
}

export default Login;