import React, {Component} from "react";
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col, NavbarBrand, Navbar} from 'reactstrap';
import {Link} from 'react-router-dom';
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { contains } from "dom-helpers";


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
                <h2>File Details:</h2> 
                    <p>File Name: {this.state.selectedFile.name}</p>           
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <br/>     
              </div>
            );
          } 
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
                        </div>
                    </div>
                </Navbar>
                <div className='container'>
                    <div className='row row-content'>
                        <div className='col-12'>
                            <h1>Upload Your File Here:</h1>
                        </div>
                        <div className='col-12 col-md-9'>
                            <Form>
                                <FormGroup row>
                                    <Input type="file" onChange={this.onFileChange} />
                                    <Button onClick={this.onFileUpload} color='primary' type='submit'>
                                    Upload
                                    </Button>
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