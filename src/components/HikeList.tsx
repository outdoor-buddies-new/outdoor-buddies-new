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
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [results, setResults] = useState(trails);
  const [distanceFilter, setDistanceFilter] = useState('');

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

  const filteredResults = results.filter((trail) => {
    return (difficultyFilter === 'All' || trail.difficulty === difficultyFilter) && (distanceFilter === '' || trail.distance < Number(distanceFilter))
  });

  return (
    <Container className="py-3 justify-content-center">
      <Row className="align-items-center mb-3">
        <Col>
          <h1 className="mb-0 title-font">
            List of Hikes
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
      <Row className="my-3 g-3">
        <Col md={6}>
          <Form className="d-flex gap-1" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Form.Control
              type="search"
              placeholder="Find your place"
              className="search-bg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button type="submit" className="page-button">
              Search
            </Button>
          </Form>
        </Col>

        <Col md={3}>
          <Form.Select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="search-bg"
          >
            <option value="All">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MODERATE">Moderate</option>
            <option value="HARD">Hard</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Max distance (miles)"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="search-bg"
          />
        </Col>
      </Row>
      <Row>
        {filteredResults.map((trail) => (
          <Col md={4} className="mt-2" key={trail.id}>
            <HikeCard trail={trail} />
          </Col>
        ))}

      </Row>
    </Container>
  );
};

export default HikeList;
