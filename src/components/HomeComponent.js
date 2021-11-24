import React, { Component, useState } from "react";
import axios from "axios";

// reactstrap components
import { Container } from "reactstrap";
import { Row } from "react-bootstrap";
import DocCard from "./DocCard";

// core components

class Home extends Component {
  constructor(props) {
    super(props);
    this.profileImage = React.createRef();
    this.state = { activePane: "verified", docData: [] };
  }

  componentDidMount() {
    let intials = localStorage.getItem("name").charAt(0);
    this.profileImage.current.innerHTML = intials;
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:3001/document/user", { headers: headers })
      .then((response) => {
        this.setState({ docData: response.data });
        console.log(response);
      });
  }

  changePane = (e) => {
    this.setState({ activePane: e.target.id });
  };

  render() {
    return (
      <>
        <div
          className="page-header clear-filter page-header-large"
          filter-color="blue"
          style={{ maxHeight: "100%" }}
        >
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" + require("../assets/img/bg5.jpg").default + ")",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <Container>
            <div id="profileImage" ref={this.profileImage}></div>
            <h3 className="title">{localStorage.getItem("name")}</h3>
            <p className="category">Welcome</p>
            <div className="content">
              <ul
                className="nav nav-pills nav-fill justify-content-center nav-pills-info"
                id="myTab"
                role="tablist"
                style={{ marginBottom: "32px" }}
              >
                <li className="nav-item">
                  <a
                    className={
                      this.state.activePane == "verified"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={this.changePane}
                    id="verified"
                    role="tab"
                  >
                    Verified
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      this.state.activePane == "pending"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={this.changePane}
                    id="pending"
                    role="tab"
                  >
                    Pending
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className={
                    this.state.activePane == "verified"
                      ? "tab-pane active"
                      : "tab-pane"
                  }
                  id="verified-panel"
                  role="tabpanel"
                >
                  <ul>
                    {this.state.docData.map((item) => (
                      <DocCard docData={item} />
                    ))}
                  </ul>
                </div>
                <div
                  className={
                    this.state.activePane == "pending"
                      ? "tab-pane active"
                      : "tab-pane"
                  }
                  id="pending-panel"
                  role="tabpanel"
                >
                  pending
                </div>
              </div>

              {/* <FileList/> */}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Home;
