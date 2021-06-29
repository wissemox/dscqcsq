import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2021{" "}
              <a
                className="font-weight-bold ml-1"
                href=""
                rel="noopener noreferrer"
                target="_blank"
              >
                New hire
              </a>
            </div>
          </Col>

         </Row>
      </footer>
    );
  }
}

export default Login;
