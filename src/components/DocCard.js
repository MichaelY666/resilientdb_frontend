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
  faUserCheck,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

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

  confirm = () => {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    const data = {
      _id: this.props.docData._id,
    };
    axios
      .post("http://localhost:3001/document/approve", data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        this.props.refresh({ target: { id: this.props.mode } });
      });
  };

  reject = () => {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    const data = {
      _id: this.props.docData._id,
    };
    axios
      .post("http://localhost:3001/document/reject", data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        this.props.refresh({ target: { id: this.props.mode } });
      });
  };

  delete = () => {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    axios
      .get(
        "http://localhost:3001/document/delete?id=" + this.props.docData._id,
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        this.props.refresh({ target: { id: this.props.mode } });
      });
  };

  checkApproved = () => {
    this.props.docData.approved_by.forEach((element) => {
      if (localStorage.getItem("_id") == element._id) {
        return false;
      }
    });
    return true;
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
          swal({
            title: "Valid",
            text: "File is Valid",
            icon: "success",
          });
        } else {
          swal({
            title: "Invalid",
            text: "File is Corrupt",
            icon: "error",
          });
        }
      };
      reader.readAsText(file);
    } else {
      swal({
        title: "Error",
        text: "No File Selected",
        icon: "error",
      });
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
            <CardTitle
              tag="h5"
              onClick={this.toggle}
              style={{ cursor: "pointer" }}
            >
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
              {this.props.mode == "Confirmed" && (
                <FontAwesomeIcon
                  size="2x"
                  icon={faCheckCircle}
                  onClick={this.toggleVerify}
                />
              )}
              {this.props.mode == "Pending" && this.checkApproved() && (
                <FontAwesomeIcon
                  size="2x"
                  icon={faUserCheck}
                  onClick={this.confirm}
                />
              )}
              {this.props.mode == "Pending" && (
                <FontAwesomeIcon size="2x" icon={faBan} onClick={this.reject} />
              )}
              <FontAwesomeIcon
                size="2x"
                icon={faCloudDownloadAlt}
                onClick={this.download}
              />
              <FontAwesomeIcon size="2x" icon={faEdit} onClick={this.edit} />
              <FontAwesomeIcon size="2x" icon={faTrash} onClick={this.delete} />
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
