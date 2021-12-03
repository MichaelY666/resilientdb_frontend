import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  NavLink,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { contains, width } from "dom-helpers";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

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
        } else {
          response.data.forEach((element) => {
            if (
              localStorage.getItem("name") ==
              element.first_name + " " + element.last_name
            ) {
              this.setState({
                selected: [element],
              });
            }
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
          swal({
            title: "Success",
            text: "File Uploaded Successsfully!",
            icon: "success",
          });
        };
        reader.readAsText(file);
      } else {
        swal({
          title: "Error",
          text: "No File Selected",
          icon: "error",
        });
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
          swal({
            title: "Success",
            text: "File Updated Successsfully!",
            icon: "success",
          });
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
        swal({
          title: "Success",
          text: "Users Updated Successsfully!",
          icon: "success",
        });
      }
    }
  }

  // File content to be displayed after
  // file upload is complete
  fileData() {
    if (this.state.selectedFile) {
      return (
        <Card body color="dark" inverse>
          <CardBody>
            <CardTitle tag="h5">File Details:</CardTitle>
            <CardText>File Name: {this.state.selectedFile.name}</CardText>
          </CardBody>
        </Card>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar
          dark
          expand
          fixed="top"
          full
          style={{ backgroundColor: "rgba(0, 0, 0, 0.52)" }}
        >
          <NavbarBrand href="/home">
            <img
              src="assets/images/logo.png"
              height="25%"
              width="25%"
              alt="ResilientDoc"
              style={{ marginTop: "-16px", marginBottom: "-16px" }}
            />
          </NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/landing">Logout</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <div
          style={{
            backgroundImage:
              "url(" +
              require("../assets/img/pexels-pixabay-261599.jpg").default +
              ")",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <div
              className="row row-content"
              style={{ justifyContent: "center" }}
            >
              <div
                className="col-12"
                style={{ marginTop: "80px", color: "white" }}
              >
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
                      bsSize="lg"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Typeahead
                      size="lg"
                      id="typeahead"
                      options={this.state.userData}
                      labelKey={(option) =>
                        `${option.first_name} ${option.last_name}`
                      }
                      placeholder="Add users to verify document"
                      multiple={true}
                      style={{ width: "100%", marginTop: "32px" }}
                      onChange={(selected) => {
                        this.setState({ selected: selected });
                      }}
                      selected={this.state.selected}
                    ></Typeahead>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      style={{ backgroundColor: "#4484f3", marginTop: "32px" }}
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
      </div>
    );
  }
}

export default Upload;
