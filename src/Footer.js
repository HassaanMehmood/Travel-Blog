import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faM } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faYoutube,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="Footer">
      <div className="foot-panel-2">
        <Container>
          <Row>
            <Col>
              <ul>
                <p>Explore</p>
                <a href="/explore">Travel Quiz</a>
                <a href="/explore">Budget Planner</a>
                <a href="/explore">Poll</a>
              </ul>
            </Col>
            <Col>
              <ul>
                <p>Blog</p>
                <a href="/blog-post-home">Blogs</a>
              </ul>
            </Col>
            <Col>
              <ul>
                <p>Services</p>
                <a href="/">Our Services</a>
              </ul>
            </Col>

            <Col>
              <ul>
                <p>Company</p>
                <a href="/about">About us</a>
                <a href="/about">Contact</a>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="foot-panel-3">
        <Container>
          <Row>
            <Col className="text-center">
              <div className="copyright">
                &copy; 2024 by Travelog. All Rights Reserved. &copy; 2024
                Travelog Developers. All Rights Reserved.
              </div>
              <div className="footer-icons">
                <FontAwesomeIcon icon={faGithub} className="footer-icon" />
                <FontAwesomeIcon icon={faYoutube} className="footer-icon" />
                <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
                <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
                <FontAwesomeIcon icon={faM} className="footer-icon" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
