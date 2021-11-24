import React, { Component, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Collapse,
  Form,
  FormGroup,
  Button,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudDownloadAlt,
  faEdit,
  faTrash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Redirect } from "react-router-dom";

class DocCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, verifyOpen: false, selectedFile: null };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleVerify = () => {
    this.setState({ verifyOpen: !this.state.verifyOpen });
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  download = () => {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    axios({
      url:
        "http://localhost:3001/document/download?id=" + this.props.docData._id,
      method: "GET",
      responseType: "blob",
      headers: headers,
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", this.props.docData.name);
      document.body.appendChild(link);
      link.click();
    });
  };

  edit = () => {
    this.setState({ redirect: true });
  };

  handleVerify = (e) => {
    e.preventDefault();
    if (this.state.selectedFile) {
      //create hash value for uploaded file
      let file = this.state.selectedFile;
      let reader = new FileReader();
      reader.onload = (e) => {
        const crypto = require("crypto");
        const hash = crypto.createHash("sha256");
        hash.update(e.target.result);
        const hex = hash.digest("hex");
        if (hex == this.props.docData.document_hash) {
          alert("File is valid");
        } else {
          alert("File is corrupt");
        }
      };
      reader.readAsText(file);
    } else {
      alert("No File Is Selected!");
    }
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/upload",
            state: this.props.docData,
          }}
        />
      );
    }
    return (
      <div style={{ margin: "0 32px" }}>
        <Card body color="dark" inverse>
          <CardBody>
            <CardTitle tag="h5" onClick={this.toggle}>
              {this.props.docData.name}
            </CardTitle>
            <Collapse isOpen={this.state.isOpen}>
              {this.props.docData.transaction_history.length > 0 && (
                <Table borderless dark hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Action</th>
                      <th>Performed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.docData.transaction_history.map((item) => (
                      <tr>
                        <td>{item.status}</td>
                        <td>{item.action}</td>
                        <td>
                          {item.performed_by.first_name}{" "}
                          {item.performed_by.last_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Collapse>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "32px",
              }}
            >
              <FontAwesomeIcon
                size="2x"
                icon={faCheckCircle}
                onClick={this.toggleVerify}
              />
              <FontAwesomeIcon
                size="2x"
                icon={faCloudDownloadAlt}
                onClick={this.download}
              />
              <FontAwesomeIcon size="2x" icon={faEdit} onClick={this.edit} />
              <FontAwesomeIcon size="2x" icon={faTrash} />
            </div>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.verifyOpen} toggle={this.toggleVerify}>
          <ModalHeader toggle={this.toggleVerify}>Verify</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleVerify}>
              <FormGroup>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  onChange={this.onFileChange}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  style={{ backgroundColor: "#4484f3" }}
                  color="primary"
                  type="submit"
                >
                  Verify
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DocCard;
