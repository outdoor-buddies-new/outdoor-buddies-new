'use client';

import { Card, Image } from 'react-bootstrap';

interface GroupProps {
  group: {
    name : string;
    image: string;
    people: number;
    description: string;
  };
}

export default function GroupCard({ group }: GroupProps) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-transparent border-0 pt-3 text-center">
        <Image 
          src={group.image} 
          alt={`${group.name}`} 
          width={200} 
          height={200} 
          roundedCircle 
        />
      </Card.Header>
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title className="fw-bold">
          {group.name}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-muted small">
          {group.people}
        </Card.Subtitle>
        <Card.Text className="text-secondary small flex-grow-1">
          {group.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}