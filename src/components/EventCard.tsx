'use client';

import { Event } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';

interface EventCardProps {
  event: Event;
}

/* Renders a single row in the Event table. See list/page.tsx. */
const EventCard = ({ event }: EventCardProps) => (
  <Card>
    <Card.Body>
      <Card.Title>
        {event.title}
      </Card.Title>

      <Card.Text>
        {event.description}
        <br />
        {new Date(event.date).toLocaleDateString()}
      </Card.Text>

      <Button>
        View Details
      </Button>
    </Card.Body>
  </Card>
);

export default EventCard;
