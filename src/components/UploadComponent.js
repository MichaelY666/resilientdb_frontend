import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { contains, width } from "dom-helpers";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class Upload extends Component {
  constructor(props) {
    super(props);
    if (props.location.state) {
      this.state = {
        selectedFile: props.location.state,
        mode: "edit",
        newFile: false,
      };
    } else {
      this.state = {
        selectedFile: null,
        mode: "create",
        newFile: false,
      };
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.fileData = this.fileData.bind(this);
  }

  componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:3001/users/all", { headers: headers })
      .then((response) => {
        this.setState({ userData: response.data });
        if (this.props.location.state) {
          this.setState({
            selected: this.props.location.state.associated_users,
          });
        }
      });
  }


  // On file upload (click the upload button)
  onFileChange(event) {
    // Update the state
    this.setState({ selectedFile: event.target.files[0], newFile: true });
  }

  // On file upload (click the upload button)
  onFileUpload(e) {
    toast("File Uploaded Successfully!");
    e.preventDefault();
    if (this.state.mode == "create") {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      if (this.state.selectedFile) {
        formData.append(
          "file",
          this.state.selectedFile,
          this.state.selectedFile.name
        );

        let file = this.state.selectedFile;
        let reader = new FileReader();
        reader.onload = (e) => {
          const crypto = require("crypto");
          const hash = crypto.createHash("sha256");
          hash.update(e.target.result);
          const hex = hash.digest("hex");
          formData.append("name", this.state.selectedFile.name);
          let associated_users = [];
          this.state.selected.forEach((element) => {
            associated_users.push(element._id);
          });
          formData.append("associated_users", JSON.stringify(associated_users));
          formData.append("document_hash", hex);

          // Request made to the backend api
          // Send formData object
          const headers = {
            "Content-Type": "multipart/form-data",
            "x-access-token": localStorage.getItem("token"),
          };
          axios
            .post("http://localhost:3001/document/upload", formData, {
              headers: headers,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          alert("File Uploaded Successfully!");
        };
        reader.readAsText(file);
      } else {
        alert("No File Is Selected!");
      }
    } else {
      if (this.state.newFile) {
        const formData = new FormData();
        formData.append(
          "file",
          this.state.selectedFile,
          this.state.selectedFile.name
        );

        let file = this.state.selectedFile;
        let reader = new FileReader();
        reader.onload = (e) => {
          const crypto = require("crypto");
          const hash = crypto.createHash("sha256");
          hash.update(e.target.result);
          const hex = hash.digest("hex");
          formData.append("name", this.state.selectedFile.name);
          let associated_users = [];
          this.state.selected.forEach((element) => {
            associated_users.push(element._id);
          });
          formData.append("associated_users", JSON.stringify(associated_users));
          formData.append("document_hash", hex);
          formData.append("_id", this.props.location.state._id);

          // Request made to the backend api
          // Send formData object
          const headers = {
            "Content-Type": "multipart/form-data",
            "x-access-token": localStorage.getItem("token"),
          };
          axios
            .patch("http://localhost:3001/document/upload", formData, {
              headers: headers,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          alert("File Updated Successfully!");
        };
        reader.readAsText(file);
      } else {
        let associated_users = [];
        this.state.selected.forEach((element) => {
          associated_users.push(element._id);
        });
        let data = {
          _id: this.props.location.state._id,
          name: this.props.location.state.name,
          associated_users: JSON.stringify(associated_users),
        };
        const headers = {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        };
        axios
          .put("http://localhost:3001/document/data", data, {
            headers: headers,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        alert("Users Updated Successfully!");
      }
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
          <br />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="background">
        <Navbar className="bg-dark" expand="lg">
          <ToastContainer/>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <NavbarBrand className="mr-auto" href="/home">
                  <img
                    src="assets/images/logo.png"
                    height="100%"
                    width="100%"
                    alt="ResilientDoc"
                  />
                </NavbarBrand>
              </div>
            <Nav className="ml-auto" navbar>
              <NavItem className="active">
                <NavLink href="/home">
                <FontAwesomeIcon icon={faHome} size="3x" /> 
                  <p>Home Page</p>
                </NavLink>
              </NavItem>
            </Nav>
            </div>
          </div>
        </Navbar>
        <div className="container">
          <div className="row row-content">
            <div className="col-12">
              <h1>Upload Your File Here:</h1>
            </div>
            <div className="col-12 col-md-9">
              <Form>
                <FormGroup>
                  <Input
                    id="exampleFile"
                    type="file"
                    name="file"
                    onChange={this.onFileChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Typeahead
                    id="typeahead"
                    options={this.state.userData}
                    labelKey={(option) =>
                      `${option.first_name} ${option.last_name}`
                    }
                    placeholder="Add users to verify document"
                    multiple={true}
                    style={{ width: 100 + "%" }}
                    onChange={(selected) => {
                      this.setState({ selected: selected });
                    }}
                    selected={this.state.selected}
                  ></Typeahead>
                </FormGroup>
                <FormGroup>
                  <Button
                    style={{ backgroundColor: "#4484f3" }}
                    onClick={this.onFileUpload}
                    color="primary"
                    type="submit"
                  >
                    Upload
                  </Button>
                </FormGroup>
                <FormGroup>{this.fileData()}</FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
