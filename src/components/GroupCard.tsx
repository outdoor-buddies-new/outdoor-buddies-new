'use client';

import { Card, Row, Col, Button, Container, Image } from 'react-bootstrap';
import { Group } from '@prisma/client';
import Link from 'next/link';

export default function GroupCard({ group }: { group:Group }) {

  const getValidImageUrl = (url: string | null | undefined, fallback: string) => {
    if (!url) return fallback;
    if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return fallback;
  };
  
  const groupImageSrc = getValidImageUrl(group.image, '/images/default-image-user.jpg');

  return (
    <Container className="d-flex justify-content-center align-items-center">
    <Card className="group-card shadow-sm bg-white">
      <Card.Header className="bg-transparent border-0 pt-3">
        <Row className="align-items-center">
          <Col xs={4} md={3} lg={2} className="d-flex justify-content-start">
            <Image
              src={groupImageSrc} 
              alt={group.name} 
              className="profile-group-card-picture rounded-circle" 
            />
          </Col>
          <Col xs={8} md={9} lg={10} className="d-flex flex-column align-items-start text-start">
            <Card.Title className="fw-bold mb-0 fs-2">
              {group.name}
            </Card.Title>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className= "text-center pt-0">
        <Row>
          <Col xs={4} md={3} lg={2}></Col>
          <Col xs={8} md={9} lg={10} className="text-start">
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
              Last Event Date: {group.lastdate ? new Date(group.lastdate).toLocaleDateString() : 'N/A'}
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
            Group Forum
          </Link>
        </Row>
      </Card.Body>
    </Card>
    </Container>
  );
}