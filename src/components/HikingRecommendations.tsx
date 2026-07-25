'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import swal from 'sweetalert';
import { redirect } from 'next/navigation';
// import { addStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddStuffSchema } from '@/lib/validationSchemas';

const HikingRecommendations: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddStuffSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3 justify-content-center">
      <div className="my-3 d-flex gap-3">
            <Form.Control
              type="search"
              placeholder="Find your place"
            />
            <Button type="submit">
              Search
            </Button>
          </div>
      <Row>
      <h2>Most Popular</h2>
      </Row>

      <Row>
        <Col md={4}>
          <Card style={{ height: '370px' }}>
            <Card.Img variant="top" src="/diamond.head.jpg" style={{height: '220px', objectFit: 'cover',}}/>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                  Diamond Head
                </Card.Title>
                <Button>
                  View
                </Button>
              </div>
              <Row className="mt-3">
                <Col>
                  <Card.Text>
                    Difficulty: Moderate
                    <br />
                    Distance: 0.8 Miles
                    <br />
                    Groups: 23
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    Location: 
                    <br />
                    4204 Diamond Head Road
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ height: '370px' }}>
            <Card.Img variant="top" src="/koko-head.jpg" style={{height: '220px', objectFit: 'cover',}}/>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                  Koko Head
                </Card.Title>
                <Button>
                  View
                </Button>
              </div>
              <Row className="mt-3">
                <Col>
                  <Card.Text>
                    Difficulty: Hard
                    <br />
                    Distance: 0.75 Miles
                    <br />
                    Groups: 8
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    Location: 
                    <br />
                    423 Kaumakani Street
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ height: '370px' }}>
            <Card.Img variant="top" src="/manoa-falls.jpg" style={{height: '220px', objectFit: 'cover',}}/>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                  Manoa Falls
                </Card.Title>
                <Button>
                  View
                </Button>
              </div>
              <Row className="mt-3">
                <Col>
                  <Card.Text>
                    Difficulty: Easy
                    <br />
                    Distance: 0.8 Miles
                    <br />
                    Groups: 12
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    Location:
                    <br />
                    3860 Manoa Road
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
      <h2 className="mt-3">Recommended</h2>
      </Row>

      <Row>
        <Col md={4}>
          <Card style={{ height: '370px' }}>
            <Card.Img variant="top" src="/diamond.head.jpg" style={{height: '220px', objectFit: 'cover',}}/>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                  Diamond Head
                </Card.Title>
                <Button>
                  View
                </Button>
              </div>
              <Row className="mt-3">
                <Col>
                  <Card.Text>
                    Difficulty: Moderate
                    <br />
                    Distance: 0.8 Miles
                    <br />
                    Groups: 23
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    Location: 
                    <br />
                    4204 Diamond Head Road
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ height: '370px' }}>
            <Card.Img variant="top" src="/koko-head.jpg" style={{height: '220px', objectFit: 'cover',}}/>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                  Koko Head
                </Card.Title>
                <Button>
                  View
                </Button>
              </div>
              <Row className="mt-3">
                <Col>
                  <Card.Text>
                    Difficulty: Hard
                    <br />
                    Distance: 0.75 Miles
                    <br />
                    Groups: 8
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    Location: 
                    <br />
                    423 Kaumakani Street
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ height: '370px' }}>
            <Card.Img variant="top" src="/manoa-falls.jpg" style={{height: '220px', objectFit: 'cover',}}/>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                  Manoa Falls
                </Card.Title>
                <Button>
                  View
                </Button>
              </div>
              <Row className="mt-3">
                <Col>
                  <Card.Text>
                    Difficulty: Easy
                    <br />
                    Distance: 0.8 Miles
                    <br />
                    Groups: 12
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    Location:
                    <br />
                    3860 Manoa Road
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HikingRecommendations;
