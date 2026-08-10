'use client';

import { Card, Image, Button, Container } from 'react-bootstrap';
import { Profile } from '@prisma/client';

export default function ProfileCard({ profile }: { profile:Profile }) {
  const getValidImageUrl = (url: string | null | undefined, fallback: string) => {
    if (!url) return fallback;
    if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return fallback;
  };
  
  const profileImageSrc = getValidImageUrl(profile.image, '/images/default-image-user.jpg');

  return (
    <Container className="justify-content-center align-items-center">
    <Card className="profile-card shadow-sm bg-white h-100 w-100">
      <Card.Header className="bg-transparent text-center border-0 pt-3 ">
        <Image
              src={profileImageSrc} 
              alt={profile.name} 
              className="profile-group-card-picture rounded-circle" 
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