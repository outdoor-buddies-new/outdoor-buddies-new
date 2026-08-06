import { Container, Row, Col } from 'react-bootstrap';
import { Group } from '@/lib/validationSchemas';
import GroupCard from '@/components/Groups';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import Link from 'next/link';

const group: Group [] = [{
    id: 1,
    name: 'Ducks',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Hikers_%288700160875%29.jpg/960px-Hikers_%288700160875%29.jpg',
    members: 3,
    description: 'Looking to add 2 more members to our small group. We tend to go on more difficult hikes, so people with experience please.',
    },
    {
      id: 2,
      name: 'Math Hikes',
      image: '/images/mathclub.jpeg',
      members: 10,
      description: 'We go on hikes and talk about math. Please join if interested, we always welcome new members.',
    },
    {
      id: 3,
      name: 'HNL Hiking',
      image: '/images/hnlhike.jpeg',
      members: 55,
      description: 'We heard about this website and wanted to branch out. Our group number is bigger than what is listed but we have only included members that have profiles here. Always welcome more and every hike is a big crowd.',
    },
  ];

const GroupsPage = async () => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  return (
    <main>
      <Container className="py-3">
        <h1 className="mb-4">Groups</h1>
        {/*<div className="my-3 d-flex gap-3">
            <Form.Control
              type="search"
              placeholder="Find your place"
            />
            <Button type="submit">
              Search
            </Button>
          </div>*/}
        <Link href="/groups/add" className="btn btn-primary">
          Add a Group
        </Link>
        <Row xs={1} md={2} lg={2} className="g-4">
          {group.map((group) => (
            <Col key={`Groups-${group.name}`}>
              <GroupCard group = {group} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default GroupsPage;

