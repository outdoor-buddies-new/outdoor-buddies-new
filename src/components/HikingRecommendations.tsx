'use client';

import { Trail } from '@prisma/client';
import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
 import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import HikeCard from '@/components/HikeCard';
import { AddStuffSchema } from '@/lib/validationSchemas';

interface HikingRecommendationsProps {
trails: Trail[];
}

const HikingRecommendations: React.FC<HikingRecommendationsProps> = ({ trails }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
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
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3 justify-content-center">
      <h1 className="mb-4">Hiking Recommendations</h1>
      <div className="my-3 d-flex gap-3">
            <Form.Control
              type="search"
              placeholder="Find your place"
            />
            <Button type="submit">
              Search
            </Button>
          </div>
      <Row>
      <h2>All Hikes</h2>
      </Row>

      <Row>
        {trails.map((trail) => (
          <Col md={4} key={trail.id}>
            <HikeCard trail={trail} />
          </Col>
        ))}

      </Row>
    </Container>
  );
};

export default HikingRecommendations;
