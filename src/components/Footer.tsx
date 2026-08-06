import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Instagram } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3">
    <Container>
      <Row>
        <Col className="text-center">
          <div className="mb-2">About Us</div>
          <div className="mb-2">Contact Us</div>
          <a href="https://outdoor-buddies.github.io/">Group Home Page</a>
        </Col>
        <Col className="text-center">
          Department of Information and Computer Sciences
          <br />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          <br />
        </Col >
        <Col className="text-center">
          Sign up for our newsletter!
          <br />
          <div className="mb-3 mt-3 d-flex gap-2">
            <Form.Control
              type="email"
              placeholder="Enter your email"
            />
            <Button type="submit">
              Subscribe
            </Button>
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <Instagram size={25} />
          </div>

        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
