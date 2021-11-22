import React, {Component} from "react";
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col, NavbarBrand, Navbar} from 'reactstrap';
import {Link} from 'react-router-dom';
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { contains, width } from "dom-helpers";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


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

    componentDidMount() {
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          }
        axios.get('http://localhost:3001/users/all', {headers:headers})
            .then((response) => {
                this.setState({userData : response.data});
            })
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
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        //create hash value for uploaded file 
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        const hex = hash.update(this.state.selectedFile).digest('hex');

        formData.append(
            "name",
            this.state.selectedFile.name
        );
        let associated_users = []
        console.log(this.state.selected);
        this.state.selected.forEach(element => {
            associated_users.push(element._id)
        });
        formData.append(
            "associated_users",
            JSON.stringify(associated_users)
        );
        formData.append(
            "document_hash",
            hex
        );

        // Request made to the backend api
        // Send formData object
        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-access-token': localStorage.getItem('token')
          }
        axios.post('http://localhost:3001/document/upload', formData, {headers: headers})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
								<NavbarBrand className="mr-auto" href="/home">
									<img src="assets/images/logo.png" height = "100%" width ="100%" alt="ResilientDoc"/>
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
                                </FormGroup>
                                <FormGroup row>
                                    <Typeahead
                                        id="typeahead"
                                        options={this.state.userData}
                                        labelKey={option => `${option.first_name} ${option.last_name}`}
                                        placeholder="Add users to verify document"
                                        multiple={true}
                                        style={{width: 100+'%'}}
                                        onChange={(selected) => {
                                            this.setState({selected: selected});
                                        }}
                                        selected={this.state.selected}
                                    ></Typeahead>
                                </FormGroup>
                                <FormGroup row>
                                    <Button style={{backgroundColor: '#4484f3'}} onClick={this.onFileUpload} color='primary' type='submit'>
                                    Upload
                                    </Button>
                                </FormGroup>
                                <FormGroup row>
                                    {this.fileData()}
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;