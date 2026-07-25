'use client';

import { Card, Image } from 'react-bootstrap';

interface ProfileProps {
  profile: {
    firstName: string;
    lastName: string;
    address: string;
    groupname : string;
    description: string;
    image: string;
  };
}

export default function ProfileCard({ profile }: ProfileProps) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-transparent border-0 pt-3 text-center">
        <Image 
          src={profile.image} 
          alt={`${profile.firstName} ${profile.lastName}`} 
          width={75} 
          height={75} 
          roundedCircle 
        />
      </Card.Header>
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title className="fw-bold">
          {profile.firstName} {profile.lastName}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-muted small">
          {profile.address}
        </Card.Subtitle>
        <Card.Text className="text-secondary small flex-grow-1">
          {profile.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}