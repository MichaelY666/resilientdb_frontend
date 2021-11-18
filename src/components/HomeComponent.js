import React, { useState } from "react";
import FileList from "./FileList";
 

// reactstrap components
import { Container } from "reactstrap";
import { Row } from "react-bootstrap";

// core components

function Home() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
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
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container" style={{
            'width': '123px',
            'height': '123px',
            'border-radius': '50%',
            'overflow': 'hidden',
            'margin': '0 auto',
            'box-shadow': '0 10px 25px 0 rgba(0,0,0,.3)'
          }}>
            <img alt="..." src={require("../assets/img/ryan.jpg").default}></img>
          </div>
          <h3 className="title">Ryan Scheinder</h3>
          <p className="category">Welcome</p>
          <div className="content">
            <FileList/>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
