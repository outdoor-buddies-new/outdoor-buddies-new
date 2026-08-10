/**
 * @fileoverview GroupSearch component where User can view and search through all Group Cards
 * User:Can create, edit, and delete Group Cards through:
 *  - AddGroupForm in groups/add
 *  - EditGroupForm in groups/edit/[id]
 *  - DeleteButtonGroup in components
 * searchGroups in dbActions
 */

'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { Group } from '@prisma/client';
import { searchGroups } from '@/lib/dbActions';
import GroupCard from '@/components/GroupCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

interface GroupSearchProps {
  groups: Group[];
}

const GroupSearch: React.FC<GroupSearchProps> = ({ groups }) => {
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(groups);
  const [commitmentFilter, setCommitmentFilter] = useState('All');

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

  const filteredResults = results.filter((groups) => {
    return (commitmentFilter === 'All' || groups.intensity=== commitmentFilter)
  });

  return (
    <Container className="py-3">
      <h1 className="mb-4 title-font">Groups</h1>
      <Row className="my-3 d-flex g-3">
        <Col md={9}>
          <Form className="d-flex gap-1" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Form.Control
              type="search"
              placeholder="Find your people"
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
            value={commitmentFilter}
            onChange={(e) => setCommitmentFilter(e.target.value)}
            className="search-bg"
          >
              <option value="All">All Commitments</option>
              <option value="Casual">Casual</option>
              <option value="Sometimes_Casual">Sometimes Casual, Sometimes Moderate</option>
              <option value="Moderate">Moderate</option>
              <option value="Sometimes_Moderate">Sometimes Moderate, Sometimes Serious</option>
              <option value="Serious">Serious</option>
          </Form.Select>
        </Col>
      </Row>
      <Link href="/groups/add" className="btn btn-primary page-button">
        Add a Group
      </Link>
      <Container className="invisible mt-3 mb-3">
        invis
      </Container>
      <Container>
        <Row xs={1} md={1} lg={1} className="g-4 justify-content-center">
          {filteredResults.map((group) => (
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
