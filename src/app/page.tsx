import { Col, Container, Row, Button } from 'react-bootstrap';
import { PeopleFill, PersonWalking, BoxArrowInDown } from 'react-bootstrap-icons';
import Link from 'next/link';
import { auth } from '@/lib/auth';

/** The Landing page. */
const Home = async () => {
  const session = await auth();

  return (
  <main>
    <Container id="landing-page" fluid className="p-0">
      <Row className="g-0">
        <Col md={7} className="hero-image"></Col>
        <Col md={5} className="hero-text">
          <Row className="mb-5 gap-1 text-center">
            <h1 className="mt-5 mb-5">{"Discover Hawaii's Trails"}</h1>
            <Col className="text-center">
              <PeopleFill size={100}/>
              <h2>Connect</h2>
              <h3>With others and make new friends!</h3>
            </Col>
            <Col className="text-center">
              <PersonWalking size={100}/>
              <h2>Explore</h2>
              <h3>New places alone or with others!</h3>
            </Col>
            <Col className="text-center">
              <BoxArrowInDown size={100}/>
              <h2>Share</h2>
              <h3>Your experience with others!</h3>
            </Col>
          </Row>
          <p>Connect with others for hiking, running, and walking groups!</p>
          {!session && (
            <div className="d-flex gap-3">
              <Link href="/auth/signin">
                <Button size="lg" className="hero-button">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" className="hero-button">Sign Up</Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  </main>
  )
};

export default Home;
