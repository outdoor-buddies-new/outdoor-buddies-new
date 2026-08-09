'use client';

import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { Group } from '@prisma/client';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';

export default function GroupCard({ group }: { group:Group }) {

  return (
    <Container className="d-flex justify-content-center align-items-center">
    <Card className="group-card shadow-sm bg-white">
      <Card.Header className="bg-transparent border-0 pt-3">
        <Row className="align-items-center">
          <Col xs={4} className="d-flex justify-content-start">
            <SafeImage 
                      src={group.image && group.image.startsWith('/') ? group.image : ''}
                      fallbackSrc="/images/default-image-user.jpg"
                      alt={`${group.name} Pfp`} 
                      className="d-block mx-auto mb-4 profile-group-card-picture"
                      roundedCircle
                    />
          </Col>
          <Col xs={8} className="d-flex flex-column align-items-start text-start">
            <Card.Title className="fw-bold mb-0 fs-2">
              {group.name}
            </Card.Title>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className= "text-center pt-0">
        <Row>
          <Col xs={5}></Col>
          <Col xs={7} className="text-start">
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
          <Col xs={6} className="justify-content-start">
            <div>
            <Card.Text>
              Last Event Location: {group.lastlocation}
            </Card.Text>
            </div>
            <div>
            <Card.Text>
              No
              {/*Date: {group.lastdate ? new Date(group.lastdate).toLocaleDateString() : 'N/A'}*/}
            </Card.Text>
            </div>
          </Col>
          <Col xs={6} className="">
            <Button href={`/groups/${group.id}`} className="page-button">
            View Details
          </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 mx-3 my-3">
          <Link href={`/groups/${group.id}/forum`} className="btn btn-primary page-button">
            Request to Join
          </Link>
        </Row>
      </Card.Body>
    </Card>
    </Container>
  );
}