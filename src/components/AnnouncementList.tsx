'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Col, Container, Row } from 'react-bootstrap';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import EventCard from '@/components/EventCard';
import { Event } from '@prisma/client';

interface AnnouncementListProps {
  events: Event[];
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({ events }) => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

 if (status === 'unauthenticated') {
   redirect('/auth/signin');
 }

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="mb-0">
            Announcements & Events
          </h1>
        </Col>

        {role === 'ADMIN' && (
          <Col className="text-end">
            <Button href="/announcements/add">
              Create Announcement
            </Button>
          </Col>
        )}
      </Row>

      <p className="mb-5">
        Stay updated with upcoming hikes, community events, and Outdoor Buddies news.
      </p>

      <h2 className="mb-3">
        Upcoming Events
      </h2>

      <Row className="g-4">
        {events.map((event) => (
          <Col md={4} key={event.id}>
            <div>
              <EventCard event={event} />

              {role === 'ADMIN' && (
                <Button
                  href={`/announcements/edit/${event.id}`}
                  className="w-100"
                >
                  Edit
                </Button>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnnouncementList;
