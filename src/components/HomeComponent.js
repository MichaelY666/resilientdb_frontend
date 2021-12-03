import React, { Component, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
// reactstrap components
import {
  Button,
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Row } from "react-bootstrap";
import DocCard from "./DocCard";

// core components

class Home extends Component {
  constructor(props) {
    super(props);
    this.profileImage = React.createRef();
    this.state = { activePane: "Confirmed", docData: [] };
  }

  componentDidMount() {
    let intials = localStorage.getItem("name").charAt(0);
    this.profileImage.current.innerHTML = intials;
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:3001/document/user?type=Confirmed", {
        headers: headers,
      })
      .then((response) => {
        this.setState({ docData: response.data });
        console.log(response);
      });
  }

  changePane = (e) => {
    this.setState({ docData: [] });
    this.setState({ activePane: e.target.id });
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:3001/document/user?type=" + e.target.id, {
        headers: headers,
      })
      .then((response) => {
        this.setState({ docData: response.data });
        console.log(response);
      });
  };

  render() {
    return (
      <>
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
                <NavLink href="/upload">Upload</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/landing">Logout</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
        <div
          className="page-header clear-filter page-header-large"
          style={{ maxHeight: "100%" }}
        >
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" +
                require("../assets/img/pexels-tirachard-kumtanom-733857.jpg")
                  .default +
                ")",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <Container>
            <div id="profileImage" ref={this.profileImage}></div>
            <h3 className="title" style={{ color: "black" }}>
              {localStorage.getItem("name")}
            </h3>
            <p className="category" style={{ color: "black" }}>
              Welcome
            </p>
            {/* <Button
              color="secondary"
              href="/upload"
              className=" btn-round btn-lg"
            >
              <FontAwesomeIcon icon={faFolderPlus} size="3x" />
              <div className="h4">Upload New File</div>
            </Button> */}
            <div className="content">
              <ul
                className="nav nav-pills nav-fill justify-content-center nav-pills-info"
                id="myTab"
                role="tablist"
                style={{ marginBottom: "32px", backgroundColor: "#dfdede" }}
              >
                <li className="nav-item">
                  <a
                    className={
                      this.state.activePane == "Confirmed"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={this.changePane}
                    id="Confirmed"
                    role="tab"
                  >
                    Confirmed
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      this.state.activePane == "Pending"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={this.changePane}
                    id="Pending"
                    role="tab"
                  >
                    Pending
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      this.state.activePane == "Rejected"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={this.changePane}
                    id="Rejected"
                    role="tab"
                  >
                    Rejected
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className={
                    this.state.activePane == "Confirmed"
                      ? "tab-pane active"
                      : "tab-pane"
                  }
                  id="confirmed-panel"
                  role="tabpanel"
                >
                  <ul>
                    {this.state.docData.map((item) => (
                      <DocCard
                        docData={item}
                        mode={this.state.activePane}
                        refresh={this.changePane}
                      />
                    ))}
                  </ul>
                </div>
                <div
                  className={
                    this.state.activePane == "Pending"
                      ? "tab-pane active"
                      : "tab-pane"
                  }
                  id="pending-panel"
                  role="tabpanel"
                >
                  <ul>
                    {this.state.docData.map((item) => (
                      <DocCard
                        docData={item}
                        mode={this.state.activePane}
                        refresh={this.changePane}
                      />
                    ))}
                  </ul>
                </div>
                <div
                  className={
                    this.state.activePane == "Rejected"
                      ? "tab-pane active"
                      : "tab-pane"
                  }
                  id="rejected-panel"
                  role="tabpanel"
                >
                  <ul>
                    {this.state.docData.map((item) => (
                      <DocCard
                        docData={item}
                        mode={this.state.activePane}
                        refresh={this.changePane}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Home;
