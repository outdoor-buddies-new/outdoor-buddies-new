'use client';

import { Profile } from '@prisma/client';
import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProfileCard from '@/components/ProfileCard';
import { useState } from 'react';
import { searchProfiles } from '@/lib/dbActions';
import Link from 'next/link';

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

    return (
      <Container className="py-3">
        <h1 className="title-font mb-4">Profiles</h1>
        <div className="my-3 d-flex gap-3">
          <Form.Control
            type="search"
            placeholder="Get to know others"
			className="search-bg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="page-button" onClick={handleSearch}>
          	Search
        	</Button>
        </div>
        {/*<Link href="/profile/add" className="btn btn-primary page-button">
          Add a Profile
        </Link>*/}
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