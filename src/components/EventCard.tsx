/**
 * @fileoverview EventCard component renders one Event Card
 */

'use client';

import { useSession } from 'next-auth/react';
import { Card, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import { Event } from '@prisma/client';
import { deleteEvent } from '@/lib/dbActions';

interface EventCardProps {
	event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
	const { data: session } = useSession();
	const role = session?.user?.role;

	const removeEvent = async () => {
		await deleteEvent(event.id);
	};

	return (
		<Card className="bg-white">
			<Card.Body>
				<Card.Title>
					{event.title}
				</Card.Title>

        <hr />

        <div>
          <strong>Location:</strong>{' '}
          {event.location}
        </div>

        <div>
          <strong>Posted:</strong>{' '}
          {new Date(event.createdAt).toLocaleDateString()}
        </div>

        <div className="mb-3">
          <strong>Event Date:</strong>{' '}
          {new Date(event.date).toLocaleDateString()}
        </div>

        <div className="d-flex align-items-center">
          <Button href={`/announcements/${event.id}`} className="page-button">
            View Details
          </Button>

          {role === 'ADMIN' && (
            <div className="d-flex gap-2 ms-auto">
              <Button href={`/announcements/edit/${event.id}`} variant="warning">
                Edit
              </Button>

              <Button variant="danger" onClick={removeEvent} aria-label="Delete Event">
                <Trash />
              </Button>
            </div>
          )}
        </div>
			</Card.Body>
		</Card>
	);
};

export default EventCard;
