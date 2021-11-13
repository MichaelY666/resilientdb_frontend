import React, { useState } from "react";
import IsoTopeGrid from "react-isotope";
 

// reactstrap components
import { Container } from "reactstrap";

// core components

function Home() {
  let pageHeader = React.createRef();
  const [filters, updateFilters] = useState(
    [
      { "label": "all", "isChecked": true },
      { "label": "test", "isChecked": false },
      { "label": "test1", "isChecked": false },
      { "label": "chart", "isChecked": false },
      { "label": "tile", "isChecked": false }
    ]
  );

  // Filter change handler
  const onFilter = event => {
    const {
      target: { value, checked }
    } = event;
 
    updateFilters(state =>
      state.map(f => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked
          };
        }
        return f;
      })
    );
  };

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
        className="page-header clear-filter page-header-small"
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
