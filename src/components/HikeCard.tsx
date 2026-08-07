'use client';

import { Trail } from '@prisma/client';
import { Card, Button, Col, Row } from 'react-bootstrap';

interface HikeCardProps {
  trail: Trail;
}

/* Renders a single row in the Trail table. See list/page.tsx. */
const HikeCard = ({ trail }: HikeCardProps) => (
<Card style={{ height: '375px' }}>
  <Card.Img variant="top" src={trail.image} alt ={trail.name} style={{height: '220px', objectFit: 'cover',}}/>
  <Card.Body>
    <div className="d-flex justify-content-between align-items-center">
      <Card.Title className="mb-0">
        {trail.name}
      </Card.Title>
      <Button variant="outline-primary" href={`/hikes/${trail.id}`}>
        View Details
      </Button>
    </div>
    <Row className="mt-2">
      <Col>
        <Card.Text>
          Difficulty: {trail.difficulty}
        </Card.Text>
      </Col>
      <Col>
        <Card.Text>
          Distance: {trail.distance}
        </Card.Text>
      </Col>
    </Row>

    <hr />

    <Row className="mt-2">
      <Card.Text>
        <strong>Location:</strong> {trail.location}
      </Card.Text>
    </Row>
  </Card.Body>
</Card>
);

export default HikeCard;
