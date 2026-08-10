/**
 * @fileoverview ProfileSearch component where User can view and search through all Profile Cards
 * User:Can create, edit, and delete Profile Cards through:
 *  - AddProfileForm in profile/add
 *  - EditProfileForm in profile/edit/[id]
 *  - DeleteButtonProfile in components
 * searchProfiles in dbActions
 */

'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { Profile } from '@prisma/client';
import { searchProfiles } from '@/lib/dbActions';
import ProfileCard from '@/components/ProfileCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProfileSearchProps {
  profiles: Profile[];
}

const ProfileSearch: React.FC<ProfileSearchProps> = ({ profiles }) => {
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(profiles);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setResults(profiles);
      return;
    }

    const searchedProfiles = await searchProfiles(searchTerm);
    setResults(searchedProfiles);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (!session?.user?.id) {
    console.error('User is not logged in or user ID is missing.');
    return;
  }

  return (
    <Container className="py-3">
      <h1 className="title-font mb-4">Profiles</h1>
      <Row className="my-3 d-flex gap-3">
        <Col md={12}>
          <Form className="d-flex gap-1" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Form.Control
              type="search"
              placeholder="Find other people"
              className="search-bg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="page-button">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Container className="invisible mt-3 mb-3">
        invis
      </Container>
		  <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {results.map((profile) => (
            <Col key={`Profile-${profile.name}`}>
              <ProfileCard profile={profile} />
            </Col>
          ))}
        </Row>
      </Container>
		</Container>
  );
};

export default ProfileSearch;
