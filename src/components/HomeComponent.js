import React, { Component, useState } from "react";
import axios from 'axios';
import FileList from "./FileList";
 

// reactstrap components
import { Container } from "reactstrap";
import { Row } from "react-bootstrap";

// core components

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.profileImage = React.createRef();
  }

  componentDidMount() {
    let intials = localStorage.getItem('name').charAt(0);
    this.profileImage.current.innerHTML = intials;
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
    axios.get('http://localhost:3001/document/user', {headers:headers})
      .then((response) => {
          this.setState({docData : response.data});
          console.log(response);
      })
  }

  render(){
    return (
      <>
        <div
          className="page-header clear-filter page-header-large"
          filter-color="blue"
        >
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" + require("../assets/img/bg5.jpg").default + ")",
            }}
          ></div>
          <Container>
            <div id="profileImage" ref={this.profileImage}></div>
            <h3 className="title">{localStorage.getItem('name')}</h3>
            <p className="category">Welcome</p>
            <div className="content">

              {/* <FileList/> */}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Home;
