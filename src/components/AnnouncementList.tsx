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
      <Row className="align-items-center mb-3">
        <Col>
          <h1 className="mb-0 title-font">
            Announcements & Events
          </h1>
        </Col>

        {role === 'ADMIN' && (
          <Col className="text-end">
            <Button href="/announcements/add" className="admin-button">
              Create Announcement
            </Button>
          </Col>
        )}
      </Row>

      <p className="mb-4">
        Stay updated with upcoming hikes, community events, and Outdoor Buddies news.
      </p>

      <h2 className="mb-3 title-font">
        Upcoming Events
      </h2>

      <Row className="g-4">
        {events.map((event) => (
          <Col md={4} key={event.id}>
            <div>
              <EventCard event={event} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnnouncementList;
