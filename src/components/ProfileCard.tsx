'use client';

import { Card, Image, Button, Container } from 'react-bootstrap';
import { Profile } from '@prisma/client';
import SafeImage from '@/components/SafeImage';

export default function ProfileCard({ profile }: { profile:Profile }) {

  return (
    <Container className="justify-content-center align-items-center">
    <Card className="profile-card shadow-sm bg-white h-100 w-100">
      <Card.Header className="bg-transparent text-center border-0 pt-3 ">
        <SafeImage 
          src={profile.image && profile.image.startsWith('/') ? profile.image : ''}
                  fallbackSrc="/images/default-image-user.jpg"
                  alt={`${profile.name}`} 
                  className="d-block mx-auto mb-4 profile-group-card-picture"
                  roundedCircle
                />
        <Card.Title className="fw-bold mb-1 mt-3 fs-2">
          {profile.name}
        </Card.Title>
        <Card.Subtitle className="mb-3 mt-2 text-muted small text-truncate">
          {profile.summary}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body className= "text-center pt-0">
        <div className="mb-4">
          <Card.Text>
            Group: {profile.groupname}
          </Card.Text>
        </div>
          <Button href={`/profile/${profile.id}`} className="page-button">
            View Details
          </Button>
      </Card.Body>
    </Card>
    </Container>
  );
}