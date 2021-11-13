import React from "react";
import { useState } from "react";

// reactstrap components
import {Container, Navbar,NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchway, faHandPointRight, faUserAlt } from '@fortawesome/free-solid-svg-icons'

// core components

function LandingPage() {
  let pageHeader = React.createRef();
  const [loginOpen, setLogin] = useState(false);
  const [signupOpen, setSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Username: " + e.target.username.value + "Password: " + e.target.password.value + "Remember: " + e.target.remember.checked);
    toggleLogin(!loginOpen);
  } 

  const handleSignup = (e) => {
    e.preventDefault();
		if (e.target.first_password.value === e.target.repeat_password.value)
			alert("Username: " + e.target.username.value + "Password: " + e.target.first_password.value);
      
		else
			alert("The two password value must be the same!");
    toggleSignup(!signupOpen);
  }

  const toggleLogin = () => {
    setLogin(!loginOpen);
  }

  const toggleSignup = () => {
    setSignup(!signupOpen);
  }

  // const handleLogout = () => {
  //   alert("You're successfully logged out!")
  // }

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-large">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../assets/img/bg6.png").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <div className="row">
                <div className='col-2'></div>
                <div className='col-8'>
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="assets/images/logo.png" height = "100%" width ="100%" alt="expolab"/>
                    </NavbarBrand>
                </div>
                <div className='col-2'></div>
            </div>
            <h1 className="title">Document Verifier (Beta v1.0)</h1>
            <h2>We verify document originality and keep a record for you 
                                      so that there's no hassles in the future! :) </h2>
            <div className="text-center">
              <Button
                className=" btn-round btn-lg"
                color="info"
                href="#pablo"
                onClick={toggleLogin}
              >
                <FontAwesomeIcon icon={faHandPointRight} />   Login
              </Button>
              <Button
                className=" btn-round btn-lg"
                color="info"
                href="#pablo"
                onClick={toggleSignup}
              >
                <FontAwesomeIcon icon={faUserAlt} />   Sign Up
              </Button>
              {/* <Button
                className=" btn-round btn-lg"
                color="info"
                href="#pablo"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faArchway} />   Logout
              </Button> */}
            </div>
          </Container>
        </div>
      </div>
      <Modal isOpen={loginOpen} toggle={toggleLogin}>
      				<ModalHeader toggle={toggleLogin}>Login</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleLogin}>
                    <FormGroup>
                      <Label htmlFor="username">Username</Label>
                      <Input type="text" id="username" name="username" /> 
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" name="password" /> 
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" name="remember" />
                        Remember me
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>
                  </Form>
                </ModalBody>
      </Modal>
			<Modal isOpen={signupOpen} toggle={toggleSignup}>
      				<ModalHeader toggle={toggleSignup}>Sign Up</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSignup}>
                    <FormGroup>
                      <Label htmlFor="username">Username</Label>
                      <Input type="text" id="username" name="username" /> 
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="first_password">Password</Label>
                      <Input type="first_password" id="first_password" name="first_password" /> 
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="repeat_password">Repeat Password</Label>
                      <Input type="repeat_password" id="repeat_password" name="repeat_password" /> 
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Sign Up</Button>
                  </Form>
                </ModalBody>
      </Modal>
    </>
  );
}

export default LandingPage;
