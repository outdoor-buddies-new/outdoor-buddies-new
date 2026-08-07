'use client';

import { Trail } from '@prisma/client';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import HikeCard from '@/components/HikeCard';
import { useState } from 'react';
import { searchTrails } from '@/lib/dbActions';

interface HikeListProps {
trails: Trail[];
}

const HikeList: React.FC<HikeListProps> = ({ trails }) => {

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
      <h1 className="mb-4">Listed Hikes</h1>
      <p className="mb-4">
        Check out the list of hikes below. You can search for hikes by name or location using the search bar!
      </p>
        <div className="my-3 d-flex gap-3">
          <Form.Control
            type="search"
            placeholder="Find your place"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>
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

export default HikeList;
