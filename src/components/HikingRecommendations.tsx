'use client';

import { Trail } from '@prisma/client';
import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import HikeCard from '@/components/HikeCard';
import { useState } from 'react';
import { searchTrails } from '@/lib/dbActions';

interface HikingRecommendationsProps {
trails: Trail[];
}

const HikingRecommendations: React.FC<HikingRecommendationsProps> = ({ trails }) => {
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(trails);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setResults(trails);
      return;
    }

    const searchedTrails = await searchTrails(searchTerm);
    setResults(searchedTrails);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3 justify-content-center">
      <h1 className="mb-4 title-font">Hiking Recommendations</h1>
        <div className="my-3 d-flex gap-3">
          <Form.Control
            type="search"
            placeholder="Find your place"
            className="search-bg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button onClick={handleSearch} className="page-button">
            Search
          </Button>
        </div>
      <Row>
      <h2 className="title-font">All Hikes</h2>
      </Row>

      <Row>
        {results.map((trail) => (
          <Col md={4} key={trail.id}>
            <HikeCard trail={trail} />
          </Col>
        ))}

      </Row>
    </Container>
  );
};

export default HikingRecommendations;
