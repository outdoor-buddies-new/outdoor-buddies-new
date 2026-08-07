'use client';

import { Trail } from '@prisma/client';
import { Card, Button, Col, Row } from 'react-bootstrap';

interface HikeCardProps {
  trail: Trail;
}

/* Renders a single row in the Trail table. See list/page.tsx. */
const HikeCard = ({ trail }: HikeCardProps) => (
<Card style={{ height: '370px' }} className="bg-white">
  <Card.Img variant="top" src={trail.image} alt ={trail.name} style={{height: '220px', objectFit: 'cover',}}/>
  <Card.Body>
    <div className="d-flex justify-content-between align-items-center">
      <Card.Title className="mb-0">
        {trail.name}
      </Card.Title>
      <Button className="page-button">
        Create Group
      </Button>
    </div>
    <Row className="mt-3">
      <Col>
        <Card.Text>
          Difficulty: {trail.difficulty}
          <br />
          Distance: {trail.distance}
          <br />
          Groups: XX
        </Card.Text>
      </Col>
      <Col>
        <Card.Text>
          Location: 
          <br />
          {trail.location}
        </Card.Text>
      </Col>
    </Row>
  </Card.Body>
</Card>
);

export default HikeCard;
