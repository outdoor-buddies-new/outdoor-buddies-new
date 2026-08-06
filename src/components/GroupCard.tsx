'use client';

import { Card, Image, Row, Col, Button, Container } from 'react-bootstrap';
import { Group } from '@prisma/client';

export default function GroupCard({ group }: { group:Group }) {
  return (
    <Container className="d-flex justify-content-center align-items-center">
    <Card className="group-card shadow-sm">
      <Card.Header className="bg-transparent border-0 pt-3">
        <Row className="align-items-center">
          <Col xs={4} className="d-flex justify-content-start">
            <Image 
              src={group.image} 
              alt={group.name} 
              className="group-img" 
              roundedCircle 
            />
          </Col>
          <Col xs={4} className="text-center">
            <Card.Title className="fw-bold mb-0 fs-2">
              {group.name}
            </Card.Title>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Card.Header>
      <Card.Body className="d-flex flex-column text-center">
        <Row>
          <Col>
            <Card.Subtitle className="mb-3 text-muted small">
              People: {group.members} {group.maxmembers !== null ? "/" : ""} {group.maxmembers}
            </Card.Subtitle>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text className="text-secondary small flex-grow-1 mb-3">
              {group.description}
            </Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>
              Last Event Location: {group.lastlocation}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              Date: {group.lastdate ? new Date(group.lastdate).toLocaleDateString() : 'N/A'}
            </Card.Text>
          </Col>
          <Col>
            <Button>
              Request to Join
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    </Container>
  );
}