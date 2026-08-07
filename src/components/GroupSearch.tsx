'use client';

import { Group } from '@prisma/client';
import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import GroupCard from '@/components/GroupCard';
import { useState } from 'react';
import { searchGroups } from '@/lib/dbActions';
import Link from 'next/link';

interface GroupSearchProps {
    groups: Group[];
}

const GroupSearch: React.FC<GroupSearchProps> = ({ groups }) => {
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(groups);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setResults(groups);
      return;
    }

    const searchedGroups = await searchGroups(searchTerm);
      setResults(searchedGroups);
    };

    if (status === 'loading') {
        return <LoadingSpinner />;
    }
    if (status === 'unauthenticated') {
        redirect('/auth/signin');
    }

    return (
      <Container className="py-3">
        <h1 className="mb-4">Groups</h1>
        <div className="my-3 d-flex gap-3">
          <Form.Control
            type="search"
            placeholder="Find your people"
						className="search-bg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="page-button" onClick={handleSearch}>
          	Search
        	</Button>
        </div>
        <Link href="/groups/add" className="btn btn-primary page-button">
          Add a Group
        </Link>
        <Container className="invisible mt-3 mb-3">
          invis
        </Container>
				<Container>
          <Row xs={1} md={1} lg={1} className="g-4 justify-content-center">
            {results.map((group) => (
              <Col key={`Groups-${group.name}`} className="d-flex justify-content-center">
                <GroupCard group={group} />
              </Col>
            ))}
          </Row>
        </Container>
			</Container>
    );
};

export default GroupSearch;
