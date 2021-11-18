import React, {Component} from "react";
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { contains } from "dom-helpers";
import { Container } from "react-bootstrap";


class Upload extends Component {

    constructor(props) {

		super(props);

		this.state={
			selectedFile: null
		};
		this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.fileData = this.fileData.bind(this);
	}

    // On file upload (click the upload button)
    onFileChange(event){
        // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    }

    // On file upload (click the upload button)
    onFileUpload(){
        // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      if (this.state.selectedFile){
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        
        // Details of the uploaded file
        console.log(this.state.selectedFile);

        //create hash value for uploaded file 
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        const hex = hash.update(this.state.selectedFile).digest('hex');

        console.log(hex);

        
        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
        alert('File Uploaded Successfully!');

      }
      else {
        alert('No File Is Selected!');
        }
      }
    

    // File content to be displayed after
    // file upload is complete
    fileData() {
        if (this.state.selectedFile) {
            return (
              <div>
                <h2 style={{color: "white"}}>File Details:</h2> 
                    <h3 style={{color: "white"}}>File Name: {this.state.selectedFile.name}</h3>           
                    <h3 style={{color: "white"}}>File Type: {this.state.selectedFile.type}</h3>
                    <br/>     
              </div>
            );
          } 
    }



    render() {
        return(
            <div style={{
                backgroundImage:
                  "url(" + require("../assets/img/bg1.jpg").default + ")",
                  height: 900
              }}
              
              >
                
                <div className='container' >
                <img center src="assets/images/logo.png" height = "50%" width ="50%" alt="expolab"/>
                    <div className='row row-content'>
                        <div className='col-12'>
                            <h1 style={{color: "pink"}}>Upload Your File Here:</h1>
                        </div>
                        <div className='col-12 col-md-9'>
                            <Form>
                                <FormGroup>
                                    <Container>
                                    <Row><Input type="file" onChange={this.onFileChange} className="form-control-lg" placeholder="no file selected" style={{color: "white", fontSize: 30}}/></Row>
                                    <Row></Row>
                                    <Row><Button onClick={this.onFileUpload} color='secondary' type='submit' style={{color: "white", fontSize: 30}}>
                                    Upload
                                    </Button></Row>
                                    </Container>
                                </FormGroup>
                                    {this.fileData()}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;