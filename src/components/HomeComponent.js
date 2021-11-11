import React from "react";

// reactstrap components
import { Container } from "reactstrap";

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
          <div className="photo-container">
            <img alt="..." src={require("../assets/img/ryan.jpg").default}></img>
          </div>
          <h3 className="title">Ryan Scheinder</h3>
          <p className="category">Welcome</p>
          <div className="content row">
            <div className="social-description col-3">
              <h2>48</h2>
              <p>All Files</p>
            </div>
            <div className="social-description col-3">
              <h2>24</h2>
              <p>Original</p>
            </div>
            <div className="social-description col-3">
              <h2>24</h2>
              <p>Verified</p>
            </div>
            <div className="social-description col-3">
              <h2>0</h2>
              <p>Pending</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
