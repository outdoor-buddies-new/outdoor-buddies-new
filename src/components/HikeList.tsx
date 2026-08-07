'use client';

import { Trail } from '@prisma/client';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import HikeCard from '@/components/HikeCard';
import { useState } from 'react';
import { searchTrails } from '@/lib/dbActions';
import { useSession } from 'next-auth/react';

interface HikeListProps {
trails: Trail[];
}

const HikeList: React.FC<HikeListProps> = ({ trails }) => {
  const { data: session } = useSession();
	const role = session?.user?.role;
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

  if (session === undefined) {
    return <LoadingSpinner />;
  }
  if (session === null) {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3 justify-content-center">
      <Row className="align-items-center mb-3">
        <Col>
          <h1 className="mb-0 title-font">
            List Hikes
          </h1>
        </Col>

        {role === 'ADMIN' && (
          <Col className="text-end">
            <Button href="/hikes/add" className="admin-button">
              Create a Hike
            </Button>
          </Col>
        )}
      </Row>
      <p className="mb-4">
        Check out the list of hikes below. You can search for hikes by name or location using the search bar!
      </p>
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
        {results.map((trail) => (
          <Col md={4} className="mt-2" key={trail.id}>
            <HikeCard trail={trail} />
          </Col>
        ))}

      </Row>
    </Container>
  );
};

export default HikeList;
