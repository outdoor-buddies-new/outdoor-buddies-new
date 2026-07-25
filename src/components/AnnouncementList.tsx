'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import swal from 'sweetalert';
// import { redirect } from 'next/navigation';
// import { addStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddStuffSchema } from '@/lib/validationSchemas';

const AnnouncementList: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const role = session?.user?.role;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddStuffSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

// if (status === 'unauthenticated') {
//   redirect('/auth/signin');
// }

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
            <Button>
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

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                Summer Hiking Meetup
              </Card.Title>

              <Card.Text>
                Join fellow hikers for a community hike at Manoa Falls.
                <br />
                Date: July 30, 2026
              </Card.Text>

              <Button>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                Trail Cleanup Day
              </Card.Title>

              <Card.Text>
                Help keep Hawaii trails beautiful with our cleanup event.
                <br />
                Date: August 15, 2026
              </Card.Text>

              <Button>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                New Hiking Recommendations
              </Card.Title>

              <Card.Text>
                We added new trails and recommendations to explore.
                <br />
                Posted: July 24, 2026
              </Card.Text>

              <Button>
                Read More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnnouncementList;
