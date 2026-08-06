import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import { PeopleFill, PersonWalking, SendFill } from 'react-bootstrap-icons';
import { auth } from '@/lib/auth';

/** The Landing page. */
const Home = async () => {
  const session = await auth();

  return (
  <main>
    <Container id="landing-page" fluid className="p-0">
      <Container className="landing-img d-flex flex-column align-items-center justify-content-end">
        <Card className="semi-opaque-card p-4 align-items-center mt-5 mb-5">
          <h1>Discover Remarkable Hiking Spots in Hawaiʻi</h1>
          <h2>& Make Friends Along the Way</h2>
        </Card>
      </Container>
      <Container className="landing-background fluid d-flex flex-column align-items-center justify-content-end p-0">
        <Container>
        <Row className="g-0">
          <Col className="hero-text">
            <Row className="mt-5 gap-1 text-center">
              <Col className="text-center">
                <PeopleFill size={100} />
                <h3>Connect</h3>
                <h4>With others and make new friends!</h4>
              </Col>
              <Col className="text-center">
                <PersonWalking size={100}/>
                <h3>Explore</h3>
                <h4>New places alone or with others!</h4>
              </Col>
              <Col className="text-center">
                <SendFill size={100}/>
                <h3>Share</h3>
                <h4>Your experience with others!</h4>
              </Col>
            </Row>
            <h5 className="mt-4">Connect with others for hiking, running, and walking groups!</h5>
            {!session && (
              <div className="d-flex gap-2 justify-content-center mt-4 mb-4">
                <Button href="auth/signin" className="landing-button px-4 py-2">Sign In</Button>
                <Button href="auth/signup" className="landing-button px-4 py-2">Sign Up</Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      </Container>
    </Container>
    
  </main>
  )

  /*return (
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
  )*/
};

export default Home;
