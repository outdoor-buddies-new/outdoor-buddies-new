/**
 * The Footer Component, which appears at the bottom of all pages
 * Rendered by the App Layout component
 */

import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer mt-auto py-3">
    <Container>
      <Row>
        <Col className="text-center">
          See the Development Process?
          <br />
          <br />
            <a href="https://outdoor-buddies.github.io/">Development Page</a>
        </Col>
        <Col className="text-center">
          Created by Students of the University of Hawaii
          <br />
          Department of Information and Computer Sciences
          <br />
          Honolulu, HI 96822
        </Col >
        <Col className="text-center">
          Have any Feedback for Us?
          <br />
          <br />
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdLQ01_Naf5wCZ_x35xDrNwQsSFODE1hsT9mnX6CeSziG0UPQ/viewform?usp=publish-editor">
            Feedback Form</a>
          <div className="d-flex gap-2 mt-3 justify-content-end">
            <span>© 2026</span>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
